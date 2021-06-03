import { Connection } from "typeorm";
import request from "supertest";
import app from "../app";
import { Appointment, Doctor, Patient } from "../entities";
import { createTypeormConnection } from "../config/createTypeormConnection";
import { PackRule, packRules } from "@casl/ability/extra";
import { AppAbility, defineRulesFor } from "../services/abilities";
import { signToken } from "../helpers/token";
import { RawRuleOf } from "@casl/ability";

let connection: Connection;

beforeAll(async () => {
  connection = await createTypeormConnection();
});

afterAll(() => {
  connection.close();
});

let token: string;
let userId: string;
let rules: PackRule<RawRuleOf<AppAbility>>[];

let otherPatientId: string;
let doctorId: string;
let appointment: Appointment;

///////////////////////////////////////////////////
//            PATIENT REGISTRATION               //
///////////////////////////////////////////////////
describe("Patient registration", () => {
  it("should be able to register a new patient", async () => {
    const response = await request(app).post("/patients").send({
      name: "Patient",
      surname: "Patient",
      OIB: "12345678910",
      phone: "+385990000000",
      email: "patient@mail.com",
      password: "password",
      dateOfBirth: "2020-01-01",
      address: "Address",
    });

    const patient = await Patient.findOne({ email: "patient@mail.com" });
    expect(response.statusCode).toBe(201);
    if (patient) {
      token = signToken(patient.id, defineRulesFor(patient));
      userId = patient.id;
      rules = packRules(defineRulesFor(patient));
    }
    expect(response.body).toMatchObject({
      id: userId,
      rules: rules,
      token: token,
    });
  });

  it("should not be able to register a patient with an email that's already registered", async () => {
    const res = await request(app).post("/patients").send({
      name: "Anita",
      surname: "Suton",
      OIB: "12345678910",
      phone: "+385990000000",
      email: "patient@mail.com",
      password: "password",
      dateOfBirth: "2020-01-01",
      address: "Address",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not be able to register a patient with a missing field", async () => {
    const res = await request(app).post("/patients").send({
      name: "Anita",
      surname: "Suton",
      OIB: "12345678910",
      phone: "+385990000000",
      email: "patient@mail.com",
      password: "password",
      dateOfBirth: "2020-01-01",
      //address: "Address",
    });

    expect(res.statusCode).toBe(400);
  });

  it("should not be able to register a patient with an invalid field such as invalid length of OIB", async () => {
    const res = await request(app).post("/patients").send({
      name: "Anita",
      surname: "Suton",
      OIB: "1230",
      phone: "+385990000000",
      email: "patient@mail.com",
      password: "password",
      dateOfBirth: "2020-01-01",
      address: "Address",
    });

    expect(res.statusCode).toBe(400);
  });
});

///////////////////////////////////////////////////
//         PATIENT LOGGED IN WITH JWT            //
///////////////////////////////////////////////////

describe("Patient logged with JWT", () => {
  ///////////////////////////////////////////////////
  //               PATIENT ACTIONS                 //
  ///////////////////////////////////////////////////
  describe("actions regarding patients", () => {
    it("should be able to get their own account", async () => {
      const response = await request(app)
        .get(`/patients/${userId}`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should not be able to update their own account if not webauthn logged in", async () => {
      const response = await request(app)
        .put(`/patients/${userId}`)
        .set("x-auth-token", token)
        .send({
          phone: "+385919999999",
          adress: "new address",
        });
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to get other patients", async () => {
      const response = await request(app)
        .get(`/patients`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to get some other patient", async () => {
      let newPatient = new Patient();
      Object.assign(newPatient, {
        name: "Some other",
        surname: "patient",
        OIB: "09876543210",
        phone: "+385991111111",
        email: "other.patient@mail.com",
        password: "password",
        dateOfBirth: new Date("2020-01-01"),
        address: "Address",
      });
      const otherPatient = await Patient.save(newPatient);
      otherPatientId = otherPatient.id;
      const response = await request(app)
        .get(`/patients/${otherPatientId}`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });
  });

  ///////////////////////////////////////////////////
  //                DOCTOR ACTIONS                 //
  ///////////////////////////////////////////////////
  describe("actions regarding doctors", () => {
    it("should be able to get doctors", async () => {
      const response = await request(app)
        .get(`/doctors`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should be able to get a doctor", async () => {
      let newDoctor = new Doctor();
      Object.assign(newDoctor, {
        name: "Doctor",
        surname: "Doctor",
        OIB: "10293847561",
        phone: "+385992222222",
        email: "doctor@mail.com",
        password: "password",
        qualification: "qualification",
        license: "1234567",
      });
      const otherDoctor = await Doctor.save(newDoctor);
      doctorId = otherDoctor.id;
      const response = await request(app)
        .get(`/doctors/${doctorId}`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should not be able to update a doctor", async () => {
      const response = await request(app)
        .put(`/doctors/${doctorId}`)
        .set("x-auth-token", token)
        .send({
          phone: "+385957777777",
          qualification: "new qualification",
        });
      expect(response.statusCode).toBe(500);
    });
  });

  ///////////////////////////////////////////////////
  //             APPOINTMENT ACTIONS               //
  ///////////////////////////////////////////////////
  describe("actions regarding appointments", () => {
    it("should be able to get their own appointments", async () => {
      const response = await request(app)
        .get(`/appointment`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should be able to create an appointment", async () => {
      const response = await request(app)
        .post(`/appointment/${doctorId}`)
        .set("x-auth-token", token)
        .send({
          date: "2021-12-31",
          time: "08:30",
        });
      expect(response.statusCode).toBe(200);
      appointment = response.body;
    });

    it("should not be able to create an invalid appointment such as past event/weekend etc", async () => {
      const response = await request(app)
        .post(`/appointment/${doctorId}`)
        .set("x-auth-token", token)
        .send({
          date: "2018-12-31",
          time: "08:30",
        });
      expect(response.statusCode).toBe(400);
    });

    it("should be able to get already taken appointments for a doctor", async () => {
      const response = await request(app)
        .get(`/appointment/${doctorId}/taken`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });

    it("should be able to delete their own appointment", async () => {
      const response = await request(app)
        .delete(`/appointment/${appointment.id}`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(200);
    });
  });

  ///////////////////////////////////////////////////
  //            MEDICAL RECORD ACTIONS             //
  ///////////////////////////////////////////////////
  describe("actions regarding medical records", () => {
    it("should not be able to get their own medical records", async () => {
      const response = await request(app)
        .get(`/patients/${userId}/records`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to get other patients medical records", async () => {
      const response = await request(app)
        .get(`/patients/${otherPatientId}/records`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to create a medical record", async () => {
      const response = await request(app)
        .post(`/patients/${userId}/records`)
        .set("x-auth-token", token)
        .send({
          title: "title",
          medicalHistory: "history",
          physicalExamination: "examination",
          diagnosis: "diagnosis",
          treatment: "treatment",
          recommendation: "recommendation",
          additionalNote: "additionalNote",
        });
      expect(response.statusCode).toBe(500);
    });
  });

  ///////////////////////////////////////////////////
  //         DIAGNOSTIC TESTING ACTIONS            //
  ///////////////////////////////////////////////////
  describe("actions regarding diagnostic testings", () => {
    it("should not be able to get their own diagnostic testings", async () => {
      const response = await request(app)
        .get(`/patients/${userId}/tests`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to get other patients medical records", async () => {
      const response = await request(app)
        .get(`/patients/${otherPatientId}/tests`)
        .set("x-auth-token", token)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it("should not be able to create a medical record", async () => {
      const response = await request(app)
        .post(`/patients/${userId}/tests`)
        .set("x-auth-token", token)
        .send({
          test: "test",
          result: "result",
        });
      expect(response.statusCode).toBe(500);
    });
  });
});

///////////////////////////////////////////////////
//           NOT LOGGED IN WITH JWT              //
///////////////////////////////////////////////////

describe("Patient not logged in", () => {
  describe("actions regarding patients", () => {
    ///////////////////////////////////////////////////
    //               PATIENT ACTIONS                 //
    ///////////////////////////////////////////////////
    it("should not be able to get their own account when not logged in", async () => {
      const response = await request(app).get(`/patients/${userId}`).send();
      expect(response.statusCode).toBe(401);
    });

    it("should not be able to get patients when not logged in", async () => {
      const response = await request(app).get(`/patients`).send();
      expect(response.statusCode).toBe(401);
    });

    it("should not be able to get some other patient when not logged in", async () => {
      const response = await request(app)
        .get(`/patients/${otherPatientId}`)
        .send();
      expect(response.statusCode).toBe(401);
    });
  });
  ///////////////////////////////////////////////////
  //                DOCTOR ACTIONS                 //
  ///////////////////////////////////////////////////
  describe("actions regarding doctors", () => {
    it("should not be able to get doctors when not logged in", async () => {
      const response = await request(app).get(`/doctors`).send();
      expect(response.statusCode).toBe(401);
    });

    it("should not be able to get a doctor when not logged in", async () => {
      const response = await request(app).get(`/doctors/${doctorId}`).send();
      expect(response.statusCode).toBe(401);
    });
  });
});

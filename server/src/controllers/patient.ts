import { Request, Response } from "express";
import { validate } from "class-validator";
import Patient from "../entities/Patient";
import { packRules } from "@casl/ability/extra";
import { ForbiddenError, subject } from "@casl/ability";
import { defineRulesFor } from "../services/abilities";
import {
  getPatientsQuery,
  getPatientByIdQuery,
  insertPatientQuery,
} from "../services/patient";
import { findUserByEmail } from "../services/user";
import { hashPassword } from "../helpers/hash";
import { signToken } from "../helpers/token";
import { getMedicalRecordListPatient } from "../services/medicalRecord";
import { getDiagnosticTestingsList } from "../services/diagnosticTesting";

export const getPatients = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const patients = await getPatientsQuery();
    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("Patient", { id: true })
    );
    return res.json(patients);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getPatient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const patient = await getPatientByIdQuery(req.params.id);
    if (!patient) {
      return res.status(400).json({
        error: [
          {
            msg: "Patient not found",
          },
        ],
      });
    }
    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("Patient", patient)
    );
    const medicalRecords = await getMedicalRecordListPatient(patient.id);
    const diagnosticTestings = await getDiagnosticTestingsList(patient.id);
    patient.medicalRecord = medicalRecords;
    patient.diagnosticTesting = diagnosticTestings;
    return res.json(patient);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postPatient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (
      !req.body ||
      !req.body.name ||
      !req.body.surname ||
      !req.body.OIB ||
      !req.body.phone ||
      !req.body.email ||
      !req.body.password ||
      !req.body.dateOfBirth ||
      !req.body.address
    ) {
      return res.status(500).json({
        error: [
          {
            msg: `Invalid request body, missing one or more of fields: 
            name, surname, OIB, phone, email, password, dateOfBirth, address`,
          },
        ],
      });
    }

    const user = await findUserByEmail(req.body.email);

    if (user) {
      return res.status(400).json({
        error: [
          {
            msg: "E-mail is already in use",
          },
        ],
      });
    }

    let patient = insertPatientQuery(req.body);

    const errors = await validate(patient);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    await Patient.save(patient);

    const rules = defineRulesFor(patient);

    const token = signToken(patient.id, rules);

    return res.status(201).json({
      id: patient.id,
      rules: packRules(rules),
      token,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putPatient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body || !req.body.phone || !req.body.address) {
      return res.status(500).json({
        error: [
          {
            msg: "Invalid request body, missing one or more of fields: phone, address",
          },
        ],
      });
    }
    const { phone, address } = req.body;
    let patient = await getPatientByIdQuery(req.params.id);

    if (!patient) {
      return res.status(400).json({
        error: [
          {
            msg: "Patient does not exist",
          },
        ],
      });
    }

    if (phone.length < 7 || address === "") {
      return res.status(500).json({
        error: [
          {
            msg: "Invalid length of phone or address field",
          },
        ],
      });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "update",
      subject("Patient", patient)
    );

    patient.phone = phone;
    patient.address = address;

    await Patient.save(patient);

    const medicalRecords = await getMedicalRecordListPatient(patient.id);
    const diagnosticTestings = await getDiagnosticTestingsList(patient.id);
    patient.medicalRecord = medicalRecords;
    patient.diagnosticTesting = diagnosticTestings;
    return res.json(patient);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

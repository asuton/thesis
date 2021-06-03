import {
  defineRulesFor,
  createAbility,
  AppAbilities,
  AppAbility,
} from "../services/abilities";
import { Authorization } from "../utils/constants";
import { v4 as uuid4 } from "uuid";
import { Ability, RawRuleOf, subject } from "@casl/ability";

interface User {
  id: string;
  authorization: Authorization;
}

describe("Permissions", () => {
  let user: User;
  let rules: RawRuleOf<AppAbility>[];
  let ability: Ability<AppAbilities>;

  ///////////////////////////////////////////////////
  //                  ADMIN ROLE                   //
  ///////////////////////////////////////////////////
  describe("When user is an admin", () => {
    beforeEach(() => {
      user = { authorization: Authorization.Admin, id: uuid4() };
      rules = defineRulesFor(user);
      ability = createAbility(rules);
    });

    ///////////////////////////////////////////////////
    //               DOCTOR SUBJECT                  //
    ///////////////////////////////////////////////////
    it("read and create all doctors but can't update or delete", () => {
      expect(ability.can("read", "Doctor")).toBe(true);
      expect(ability.can("create", "Doctor")).toBe(true);
      expect(ability.can("update", "Doctor")).toBe(false);
      expect(ability.can("delete", "Doctor")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //               PATIENT SUBJECT                 //
    ///////////////////////////////////////////////////
    it("can't do anything with patients", () => {
      expect(ability.can("read", "Patient")).toBe(false);
      expect(ability.can("create", "Patient")).toBe(false);
      expect(ability.can("update", "Patient")).toBe(false);
      expect(ability.can("delete", "Patient")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //             APPOINTMENT SUBJECT               //
    ///////////////////////////////////////////////////
    it("can't do anything with appointments", () => {
      expect(ability.can("read", "Appointment")).toBe(false);
      expect(ability.can("create", "Appointment")).toBe(false);
      expect(ability.can("update", "Appointment")).toBe(false);
      expect(ability.can("delete", "Appointment")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //            MEDICAL RECORD SUBJECT             //
    ///////////////////////////////////////////////////
    it("can't do anything with medical records", () => {
      expect(ability.can("read", "MedicalRecord")).toBe(false);
      expect(ability.can("create", "MedicalRecord")).toBe(false);
      expect(ability.can("update", "MedicalRecord")).toBe(false);
      expect(ability.can("delete", "MedicalRecord")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //          DIAGNOSTIC TESTING SUBJECT           //
    ///////////////////////////////////////////////////
    it("can't do anything with diagnostic testings", () => {
      expect(ability.can("read", "DiagnosticTesting")).toBe(false);
      expect(ability.can("create", "DiagnosticTesting")).toBe(false);
      expect(ability.can("update", "DiagnosticTesting")).toBe(false);
      expect(ability.can("delete", "DiagnosticTesting")).toBe(false);
    });
  });

  ///////////////////////////////////////////////////
  //                  DOCTOR ROLE                  //
  ///////////////////////////////////////////////////
  describe("When user is a doctor", () => {
    beforeEach(() => {
      user = { authorization: Authorization.Doctor, id: uuid4() };
      rules = defineRulesFor(user);
      ability = createAbility(rules);
    });

    ///////////////////////////////////////////////////
    //               DOCTOR SUBJECT                  //
    ///////////////////////////////////////////////////
    it("can read doctors, update their own account but can't delete", () => {
      expect(ability.can("read", subject("Doctor", { id: false }))).toBe(true);
      expect(ability.can("read", subject("Doctor", { id: user.id }))).toBe(
        true
      );
      expect(ability.can("create", "Doctor")).toBe(false);
      expect(ability.can("update", subject("Doctor", { id: false }))).toBe(
        false
      );
      expect(ability.can("update", subject("Doctor", { id: user.id }))).toBe(
        true
      );
      expect(ability.can("delete", subject("Doctor", { id: false }))).toBe(
        false
      );
      expect(ability.can("delete", subject("Doctor", { id: user.id }))).toBe(
        false
      );
    });

    ///////////////////////////////////////////////////
    //               PATIENT SUBJECT                 //
    ///////////////////////////////////////////////////
    it("can read patients but nothing else with them", () => {
      expect(ability.can("read", "Patient")).toBe(true);
      expect(ability.can("create", "Patient")).toBe(false);
      expect(ability.can("update", "Patient")).toBe(false);
      expect(ability.can("delete", "Patient")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //             APPOINTMENT SUBJECT               //
    ///////////////////////////////////////////////////
    it("can only read and delete their own appointments", () => {
      expect(
        ability.can("read", subject("Appointment", { doctorId: false }))
      ).toBe(false);
      expect(
        ability.can("read", subject("Appointment", { doctorId: user.id }))
      ).toBe(true);
      expect(ability.can("create", "Appointment")).toBe(false);
      expect(
        ability.can("update", subject("Appointment", { doctorId: false }))
      ).toBe(false);
      expect(
        ability.can("update", subject("Appointment", { doctorId: user.id }))
      ).toBe(false);
      expect(
        ability.can("delete", subject("Appointment", { doctorId: false }))
      ).toBe(false);
      expect(
        ability.can("delete", subject("Appointment", { doctorId: user.id }))
      ).toBe(true);
    });

    ///////////////////////////////////////////////////
    //            MEDICAL RECORD SUBJECT             //
    ///////////////////////////////////////////////////
    it("can create and read medical records but can only update their own", () => {
      expect(
        ability.can("read", subject("MedicalRecord", { doctorId: false }))
      ).toBe(true);
      expect(
        ability.can("read", subject("MedicalRecord", { doctorId: user.id }))
      ).toBe(true);
      expect(ability.can("create", "MedicalRecord")).toBe(true);
      expect(
        ability.can("update", subject("MedicalRecord", { doctorId: false }))
      ).toBe(false);
      expect(
        ability.can("update", subject("MedicalRecord", { doctorId: user.id }))
      ).toBe(true);
      expect(ability.can("delete", "MedicalRecord")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //          DIAGNOSTIC TESTING SUBJECT           //
    ///////////////////////////////////////////////////
    it("can create and read diagnostic testings", () => {
      expect(
        ability.can("read", subject("DiagnosticTesting", { doctorId: false }))
      ).toBe(true);
      expect(
        ability.can("read", subject("DiagnosticTesting", { doctorId: user.id }))
      ).toBe(true);
      expect(ability.can("create", "DiagnosticTesting")).toBe(true);
      expect(ability.can("update", "DiagnosticTesting")).toBe(false);
      expect(ability.can("delete", "DiagnosticTesting")).toBe(false);
    });
  });

  ///////////////////////////////////////////////////
  //                 PATIENT ROLE                  //
  ///////////////////////////////////////////////////
  describe("When user is a patient", () => {
    beforeEach(() => {
      user = { authorization: Authorization.Patient, id: uuid4() };
      rules = defineRulesFor(user);
      ability = createAbility(rules);
    });

    ///////////////////////////////////////////////////
    //               DOCTOR SUBJECT                  //
    ///////////////////////////////////////////////////
    it("can read doctors, nothing else with them", () => {
      expect(ability.can("read", "Doctor")).toBe(true);
      expect(ability.can("create", "Doctor")).toBe(false);
      expect(ability.can("update", "Doctor")).toBe(false);
      expect(ability.can("delete", "Doctor")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //               PATIENT SUBJECT                 //
    ///////////////////////////////////////////////////
    it("can read their own account and update it", () => {
      expect(ability.can("read", subject("Patient", { id: false }))).toBe(
        false
      );
      expect(ability.can("read", subject("Patient", { id: user.id }))).toBe(
        true
      );
      expect(ability.can("create", "Patient")).toBe(false);
      expect(ability.can("update", subject("Patient", { id: false }))).toBe(
        false
      );
      expect(ability.can("update", subject("Patient", { id: user.id }))).toBe(
        true
      );
      expect(ability.can("delete", "Patient")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //             APPOINTMENT SUBJECT               //
    ///////////////////////////////////////////////////
    it("can create, read and delete their own appointments", () => {
      expect(
        ability.can("read", subject("Appointment", { patientId: false }))
      ).toBe(false);
      expect(
        ability.can("read", subject("Appointment", { patientId: user.id }))
      ).toBe(true);
      expect(ability.can("create", "Appointment")).toBe(true);
      expect(ability.can("update", "Appointment")).toBe(false);
      expect(
        ability.can("delete", subject("Appointment", { patientId: false }))
      ).toBe(false);
      expect(
        ability.can("delete", subject("Appointment", { patientId: user.id }))
      ).toBe(true);
    });

    ///////////////////////////////////////////////////
    //            MEDICAL RECORD SUBJECT             //
    ///////////////////////////////////////////////////
    it("can read their own medical records", () => {
      expect(
        ability.can("read", subject("MedicalRecord", { patientId: false }))
      ).toBe(false);
      expect(
        ability.can("read", subject("MedicalRecord", { patientId: user.id }))
      ).toBe(true);
      expect(ability.can("create", "MedicalRecord")).toBe(false);
      expect(ability.can("update", "MedicalRecord")).toBe(false);
      expect(ability.can("delete", "MedicalRecord")).toBe(false);
    });

    ///////////////////////////////////////////////////
    //          DIAGNOSTIC TESTING SUBJECT           //
    ///////////////////////////////////////////////////
    it("can read their own diagnostic testings", () => {
      expect(
        ability.can("read", subject("DiagnosticTesting", { patientId: false }))
      ).toBe(false);
      expect(
        ability.can(
          "read",
          subject("DiagnosticTesting", { patientId: user.id })
        )
      ).toBe(true);
      expect(ability.can("create", "DiagnosticTesting")).toBe(false);
      expect(ability.can("update", "DiagnosticTesting")).toBe(false);
      expect(ability.can("delete", "DiagnosticTesting")).toBe(false);
    });
  });
});

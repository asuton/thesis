import { Request, Response } from "express";
import { validate } from "class-validator";
import Patient from "../models/Patient";
import { packRules } from "@casl/ability/extra";
import { ForbiddenError, subject } from "@casl/ability";
import { defineRulesFor } from "../services/abilities";
import {
  getPatientsQuery,
  getPatientByIdQuery,
  getPatientByEmailQuery,
  insertPatientQuery,
} from "../services/patient";
import { getDoctorByEmailQuery } from "../services/doctor";
import { hashPassword } from "../services/hash";
import { signToken } from "../services/token";

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
      return res.status(400).json({ msg: "Patient not found" });
    }
    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("Patient", patient)
    );
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
    const patient = await getPatientByEmailQuery(req.body.email);
    const doctor = await getDoctorByEmailQuery(req.body.email);

    if (patient || doctor) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already in use" }] });
    }

    let patientNew = insertPatientQuery(req.body);

    const errors = await validate(patientNew);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    patientNew.password = await hashPassword(patientNew.password);

    await Patient.save(patientNew);

    const rules = defineRulesFor(patientNew);

    const token = signToken(patientNew.id, rules);

    return res.status(201).json({
      id: patientNew.id,
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
    const patient = await getPatientByIdQuery(req.params.id);

    if (!patient) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Patient doesn't exist" }] });
    }

    Object.assign(patient, req.body);

    const errors = await validate(patient);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const response = await Patient.save(patient);
    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

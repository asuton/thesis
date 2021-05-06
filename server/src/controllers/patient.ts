import { Request, Response } from "express";
import { validate } from "class-validator";
import Patient from "../models/Patient";
import { packRules } from "@casl/ability/extra";
import { ForbiddenError, subject } from "@casl/ability";
import { defineRulesFor } from "../services/abilities";
import {
  getPatientsQuery,
  getPatientByIdQuery,
  insertPatientQuery,
  updatePatientQuery,
} from "../services/patient";
import { findUserByEmail } from "../services/user";
import { hashPassword } from "../helpers/hash";
import { signToken } from "../helpers/token";

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
      return res.status(400).send("Patient not found");
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
      return res
        .status(500)
        .send(
          "Invalid request body, missing one or more of fields: name, surname, OIB, phone, email, password, dateOfBirth, address"
        );
    }

    const user = await findUserByEmail(req.body.email);

    if (user) {
      return res.status(400).send("Email is already in use");
    }

    let patient = insertPatientQuery(req.body);

    const errors = await validate(patient);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    patient.password = await hashPassword(patient.password);

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
      return res
        .status(500)
        .send(
          "Invalid request body, missing one or more of fields: phone, address"
        );
    }
    const patient = await updatePatientQuery(req.params.id, req.body);

    if (!patient) {
      return res.status(400).send("Patient update error");
    }

    const errors = await validate(patient);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "update",
      subject("Patient", patient)
    );

    const response = await Patient.save(patient);
    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

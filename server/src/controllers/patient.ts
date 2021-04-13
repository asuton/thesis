import { Request, Response } from "express";
import { validate } from "class-validator";
import Patient from "../models/Patient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { packRules } from "@casl/ability/extra";
import { defineRulesForPatient } from "../auth/abilities";
import { ForbiddenError, subject } from "@casl/ability";

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    return res.json(patients);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id });
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

export const postPatient = async (req: Request, res: Response) => {
  try {
    let patient = await Patient.findOne({ email: req.body.email });
    if (patient) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(req.body.password, salt);

    let patientNew = new Patient();
    Object.assign(patientNew, req.body);

    const errors = await validate(patientNew);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    patientNew.password = hash;

    await Patient.save(patientNew);

    const rules = defineRulesForPatient(patientNew);

    const token = jwt.sign(
      {
        id: patientNew.id,
        rules: packRules(rules),
      },
      JWT_SECRET,
      { expiresIn: 360000 }
    );

    return res.status(201).json({
      id: patientNew.id,
      rules: packRules(rules),
      token,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id });

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

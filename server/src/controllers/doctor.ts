import { Request, Response } from "express";
import { validate } from "class-validator";
import Doctor from "../models/Doctor";
import { ForbiddenError, subject } from "@casl/ability";
import {
  getDoctorsQuery,
  getDoctorByIdQuery,
  insertDoctorQuery,
  updatePatientQuery,
} from "../services/doctor";
import { hashPassword } from "../helpers/hash";
import { findUserByEmail } from "../services/user";

export const getDoctors = async (_req: Request, res: Response) => {
  try {
    const doctors = await getDoctorsQuery();
    return res.json(doctors);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await getDoctorByIdQuery(req.params.id);

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }

    return res.json(doctor);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postDoctor = async (req: Request, res: Response) => {
  try {
    if (
      !req.body ||
      !req.body.name ||
      !req.body.surname ||
      !req.body.email ||
      !req.body.password ||
      !req.body.qualification ||
      !req.body.license ||
      !req.body.OIB ||
      !req.body.phone
    ) {
      return res
        .status(400)
        .send(
          "Invalid request body, missing one or more of fields: name, surname, email, password, qualification, license, OIB, phone"
        );
    }

    const user = await findUserByEmail(req.body.email);

    if (user) {
      return res.status(400).send("Email is already in use");
    }

    let doctor = insertDoctorQuery(req.body);

    const errors = await validate(doctor);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    doctor.password = await hashPassword(doctor.password);

    const response = await Doctor.save(doctor);

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putDoctor = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.phone || !req.body.qualification) {
      return res
        .status(500)
        .send(
          "Invalid request body, missing one or more of fields: phone, qualification"
        );
    }
    const doctor = await updatePatientQuery(req.params.id, req.body);

    if (!doctor) {
      return res.status(400).send("Doctor doesn't exist");
    }

    const errors = await validate(doctor);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "update",
      subject("Doctor", doctor)
    );

    const response = await Doctor.save(doctor);

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

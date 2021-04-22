import { Request, Response } from "express";
import { validate } from "class-validator";
import Doctor from "../models/Doctor";
import { ForbiddenError, subject } from "@casl/ability";
import {
  getDoctorsQuery,
  getDoctorByIdQuery,
  getDoctorByEmailQuery,
  insertDoctorQuery,
} from "../services/doctor";
import { getPatientByEmailQuery } from "../services/patient";
import { hashPassword } from "../services/hash";

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
    const doctor = await getDoctorByEmailQuery(req.body.email);
    const patient = await getPatientByEmailQuery(req.body.email);

    if (doctor || patient) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already in use" }] });
    }

    let doctorNew = insertDoctorQuery(req.body);

    const errors = await validate(doctorNew);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    doctorNew.password = await hashPassword(doctorNew.password);

    const response = await Doctor.save(doctorNew);

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findOne({ id: req.params.id });

    if (!doctor) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Doctor doesn't exist" }] });
    }

    Object.assign(doctor, req.body);

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

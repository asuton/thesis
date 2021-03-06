import { Request, Response } from "express";
import { validate } from "class-validator";
import Doctor from "../entities/Doctor";
import { ForbiddenError, subject } from "@casl/ability";
import {
  getDoctorsQuery,
  getDoctorByIdQuery,
  insertDoctorQuery,
} from "../services/doctor";
import { findUserByEmail } from "../services/user";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await getDoctorsQuery();
    ForbiddenError.from(req.ability).throwUnlessCan("read", "Doctor");
    return res.status(200).json(doctors);
  } catch (err) {
    return res.status(500).json({
      error: [
        {
          msg: "Server error",
        },
      ],
    });
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await getDoctorByIdQuery(req.params.id);

    if (!doctor) {
      return res.status(400).json({
        error: [
          {
            msg: "Doctor not found",
          },
        ],
      });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("Doctor", doctor)
    );

    const { authTag, webAuthnRegistered, authorization, ...doc } = doctor;

    return res.status(200).json(doc);
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
      return res.status(400).json({
        error: [
          {
            msg: `Invalid request body, missing one or more of fields: 
              name, surname, email, password, qualification, license, OIB, phone`,
          },
        ],
      });
    }

    const user = await findUserByEmail(req.body.email);

    if (user) {
      return res.status(400).json({
        error: [
          {
            msg: `E-mail already in use`,
          },
        ],
      });
    }

    let doctor = insertDoctorQuery(req.body);

    const errors = await validate(doctor);

    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const response = await Doctor.save(doctor);

    const { authTag, webAuthnRegistered, authorization, ...doc } = response;

    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putDoctor = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.phone || !req.body.qualification) {
      return res.status(500).json({
        error: [
          {
            msg: "Invalid request body, missing one or more of fields: phone, qualification",
          },
        ],
      });
    }

    const { phone, qualification } = req.body;
    let doctor = await getDoctorByIdQuery(req.params.id);

    if (!doctor) {
      return res.status(400).json({
        error: [
          {
            msg: "Doctor does not exist",
          },
        ],
      });
    }

    if (phone.length < 7 || qualification === "") {
      return res.status(500).json({
        error: [
          {
            msg: "Invalid length of phone or qualification field",
          },
        ],
      });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "update",
      subject("Doctor", doctor)
    );

    doctor.phone = phone;
    doctor.qualification = qualification;

    await Doctor.save(doctor);

    const { authTag, webAuthnRegistered, authorization, ...doc } = doctor;

    return res.json(doc);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

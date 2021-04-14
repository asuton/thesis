import { Request, Response } from "express";
import { validate } from "class-validator";
import Doctor from "../models/Doctor";
import bcrypt from "bcrypt";
import { Patient } from "../models";
import { ForbiddenError, subject } from "@casl/ability";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    return res.json(doctors);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findOne({ id: req.params.id });

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
    const doctor = await Doctor.findOne({ email: req.body.email });
    const patient = await Patient.findOne({ email: req.body.email });

    if (doctor || patient) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already in use" }] });
    }

    let doctorNew = new Doctor();
    doctorNew.name = req.body.name;
    doctorNew.surname = req.body.surname;
    doctorNew.license = req.body.license;
    doctorNew.qualification = req.body.qualification;
    doctorNew.OIB = req.body.OIB;
    doctorNew.phone = req.body.phone;
    doctorNew.email = req.body.email;
    doctorNew.password = req.body.password;

    const errors = await validate(doctorNew);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(req.body.password, salt);
    doctorNew.password = hash;

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

import { Request, Response } from "express";
import Doctor from "../models/Doctor";
import { getRepository } from "typeorm";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctorRepository = getRepository(Doctor);
    const doctors = await doctorRepository.find();
    return res.json(doctors);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctorRepository = getRepository(Doctor);
    const doctor = await doctorRepository.findOne({ id: req.params.id });
    if (!doctor) {
      return res.status(400).json({ msg: "User not found" });
    }
    return res.json(doctor);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postDoctor = async (req: Request, res: Response) => {
  try {
    const doctorRepository = getRepository(Doctor);

    let doctor = await doctorRepository.findOne({ email: req.body.email });
    if (doctor) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    doctor = new Doctor();
    const response = await doctorRepository.save({
      ...doctor,
      ...req.body,
    });

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putDoctor = async (req: Request, res: Response) => {
  try {
    const doctorRepository = getRepository(Doctor);
    const doctor = await doctorRepository.findOne({ id: req.params.id });
    if (doctor) {
      const response = await doctorRepository.save({
        ...doctor,
        ...req.body,
      });
      return res.json(response);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "User doesn't exist exists" }] });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

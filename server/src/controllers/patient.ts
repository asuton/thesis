import { Request, Response } from "express";
import Patient from "../models/Patient";
import { getRepository } from "typeorm";

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patientRepository = getRepository(Patient);
    const patients = await patientRepository.find();
    return res.json(patients);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const patientRepository = getRepository(Patient);
    const patient = await patientRepository.findOne({ id: req.params.id });
    if (!patient) {
      return res.status(400).json({ msg: "User not found" });
    }
    return res.json(patient);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postPatient = async (req: Request, res: Response) => {
  try {
    const patientRepository = getRepository(Patient);

    let patient = await patientRepository.findOne({ email: req.body.email });
    if (patient) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    patient = new Patient();
    const response = await patientRepository.save({
      ...patient,
      ...req.body,
    });

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putPatient = async (req: Request, res: Response) => {
  try {
    const patientRepository = getRepository(Patient);
    const patient = await patientRepository.findOne({ id: req.params.id });
    if (patient) {
      const response = await patientRepository.save({
        ...patient,
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

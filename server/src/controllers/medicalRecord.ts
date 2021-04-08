import { Request, Response } from "express";
import { validate } from "class-validator";
import { MedicalRecord } from "../models";

export const getMedicalRecords = async (_req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    return res.json(medicalRecords);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({
      id: req.params.medId,
    });
    if (!medicalRecord) {
      return res.status(400).json({ msg: "Record not found" });
    }
    return res.json(medicalRecord);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postMedicalRecord = async (req: Request, res: Response) => {
  try {
    let medicalRecord = new MedicalRecord();

    Object.assign(medicalRecord, req.body);

    medicalRecord.patientId = req.params.patId;
    medicalRecord.doctorId = req.id;

    const errors = await validate(medicalRecord);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const response = await MedicalRecord.save(medicalRecord);

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const putMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({
      id: req.params.medId,
    });
    if (!medicalRecord) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Record doesn't exist" }] });
    }

    Object.assign(medicalRecord, req.body);

    const errors = await validate(medicalRecord);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const response = await MedicalRecord.save(medicalRecord);

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

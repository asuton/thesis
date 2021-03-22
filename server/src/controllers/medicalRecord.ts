import { Request, Response } from "express";
import MedicalRecord from "../models/MedicalRecord";
import { getRepository } from "typeorm";

export const getMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecordRepository = getRepository(MedicalRecord);
    const medicalRecords = await medicalRecordRepository.find();
    return res.json(medicalRecords);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecordRepository = getRepository(MedicalRecord);
    const medicalRecord = await medicalRecordRepository.findOne({
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
    const medicalRecordRepository = getRepository(MedicalRecord);

    const medicalRecord = new MedicalRecord();
    const response = await medicalRecordRepository.save({
      ...medicalRecord,
      ...req.body,
    });

    return res.json(response);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const putMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecordRepository = getRepository(MedicalRecord);
    const medicalRecord = await medicalRecordRepository.findOne({
      id: req.params.medId,
    });
    if (medicalRecord) {
      const response = await medicalRecordRepository.save({
        ...medicalRecord,
        ...req.body,
      });
      return res.json(response);
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "Record doesn't exist exists" }] });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

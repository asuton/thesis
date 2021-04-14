import { Request, Response } from "express";
import { validate } from "class-validator";
import { MedicalRecord } from "../models";
import { ForbiddenError, subject } from "@casl/ability";

export const getMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecord.find({
      patientId: req.params.patId,
    });
    console.log(medicalRecords);

    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("MedicalRecord", medicalRecords)
    );

    return res.json(medicalRecords);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({
      id: req.params.medId,
      patientId: req.params.patId,
    });

    if (!medicalRecord) {
      return res.status(400).json({ msg: "Record not found" });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("MedicalRecord", medicalRecord)
    );

    return res.json(medicalRecord);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postMedicalRecord = async (req: Request, res: Response) => {
  try {
    let medicalRecord = new MedicalRecord();

    medicalRecord.patientId = req.params.patId;
    medicalRecord.doctorId = req.id;
    medicalRecord.title = req.body.title;
    medicalRecord.medicalHistory = req.body.medicalHistory;
    medicalRecord.physicalExamination = req.body.physicalExamination;
    medicalRecord.diagnosis = req.body.diagnosis;
    medicalRecord.treatment = req.body.treatment;
    medicalRecord.recommendation = req.body.recommendation;
    medicalRecord.additionalNote = req.body.recommendation;

    ForbiddenError.from(req.ability).throwUnlessCan(
      "create",
      subject("MedicalRecord", medicalRecord)
    );

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

    ForbiddenError.from(req.ability).throwUnlessCan(
      "update",
      subject("MedicalRecord", medicalRecord)
    );

    medicalRecord.additionalNote = req.body.additionalNote;

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

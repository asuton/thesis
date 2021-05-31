import { Request, Response } from "express";
import { validate } from "class-validator";
import { MedicalRecord } from "../entities";
import { ForbiddenError, subject } from "@casl/ability";
import {
  getPatientsMedicalRecords,
  getPatientsMedicalRecord,
  insertMedicalRecord,
} from "../services/medicalRecord";

export const getMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await getPatientsMedicalRecords(req.params.patId);

    if (medicalRecords) {
      ForbiddenError.from(req.ability).throwUnlessCan(
        "read",
        subject("MedicalRecord", medicalRecords)
      );
    }

    return res.json(medicalRecords);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await getPatientsMedicalRecord(req.params.medId);

    if (!medicalRecord) {
      return res.status(400).json({
        error: [
          {
            msg: "Record not found",
          },
        ],
      });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("MedicalRecord", medicalRecord)
    );

    const { salt, ...record } = medicalRecord;

    return res.json(record);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postMedicalRecord = async (req: Request, res: Response) => {
  try {
    if (
      !req.body ||
      !req.body.title ||
      !req.body.medicalHistory ||
      !req.body.physicalExamination ||
      !req.body.diagnosis ||
      !req.body.treatment ||
      !req.body.recommendation
    ) {
      return res.status(400).json({
        error: [
          {
            msg: `Invalid request body, missing one or more of fields: 
            title, medical history, physical examination, diagnosis, treatment, recommendation`,
          },
        ],
      });
    }

    let medicalRecord = insertMedicalRecord(req.body, req.id, req.params.patId);

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

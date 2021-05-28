import { createQueryBuilder } from "typeorm";
import { MedicalRecord } from "../models";

export const getPatientsMedicalRecords = async (
  id: string
): Promise<MedicalRecord[] | undefined> => {
  return await createQueryBuilder<MedicalRecord>("MedicalRecord")
    .where("MedicalRecord.patientId = :id", { id: id })
    .leftJoinAndMapOne(
      "MedicalRecord.doctor",
      "Doctor",
      "Doctor",
      "MedicalRecord.doctorId = Doctor.id"
    )
    .select([
      "MedicalRecord.id",
      "MedicalRecord.doctorId",
      "MedicalRecord.patientId",
      "MedicalRecord.title",
      "MedicalRecord.medicalHistory",
      "MedicalRecord.physicalExamination",
      "MedicalRecord.diagnosis",
      "MedicalRecord.treatment",
      "MedicalRecord.recommendation",
      "MedicalRecord.additionalNote",
      "MedicalRecord.createdAt",
      "MedicalRecord.updatedAt",
      "Doctor.name",
      "Doctor.surname",
    ])
    .getMany();
};

export const getPatientsMedicalRecord = async (
  id: string
): Promise<MedicalRecord | undefined> => {
  return await createQueryBuilder<MedicalRecord>("MedicalRecord")
    .where("MedicalRecord.id = :id", { id: id })
    .leftJoinAndMapOne(
      "MedicalRecord.doctor",
      "Doctor",
      "Doctor",
      "MedicalRecord.doctorId = Doctor.id"
    )
    .leftJoinAndMapOne(
      "MedicalRecord.patient",
      "Patient",
      "Patient",
      "MedicalRecord.patientId = Patient.id"
    )
    .select([
      "MedicalRecord.id",
      "MedicalRecord.doctorId",
      "MedicalRecord.patientId",
      "MedicalRecord.title",
      "MedicalRecord.medicalHistory",
      "MedicalRecord.physicalExamination",
      "MedicalRecord.diagnosis",
      "MedicalRecord.treatment",
      "MedicalRecord.recommendation",
      "MedicalRecord.additionalNote",
      "MedicalRecord.createdAt",
      "MedicalRecord.updatedAt",
      "Doctor.name",
      "Doctor.surname",
      "Patient.name",
      "Patient.surname",
      "Patient.OIB",
      "Patient.dateOfBirth",
    ])
    .getOne();
};

export const insertMedicalRecord = (
  form: MedicalRecord,
  doctorId: string,
  patientId: string
): MedicalRecord => {
  let medicalRecord = new MedicalRecord();

  medicalRecord.patientId = patientId;
  medicalRecord.doctorId = doctorId;
  medicalRecord.title = form.title;
  medicalRecord.medicalHistory = form.medicalHistory;
  medicalRecord.physicalExamination = form.physicalExamination;
  medicalRecord.diagnosis = form.diagnosis;
  medicalRecord.treatment = form.treatment;
  medicalRecord.recommendation = form.recommendation;
  medicalRecord.additionalNote = form.additionalNote;

  return medicalRecord;
};

export const getMedicalRecordListPatient = async (id: string) => {
  const medicalRecords = await MedicalRecord.find({ patientId: id });
  let result: any = medicalRecords.map((medicalRecord) => {
    return {
      title: medicalRecord.title,
      id: medicalRecord.id,
      patientId: medicalRecord.patientId,
      createdAt: medicalRecord.createdAt,
      doctorId: medicalRecord.doctorId,
    };
  });
  return result;
};

export const getMedicalRecordListDoctor = async (id: string) => {
  const medicalRecords = await MedicalRecord.find({ doctorId: id });
  let result: any = medicalRecords.map((medicalRecord) => {
    return {
      title: medicalRecord.title,
      id: medicalRecord.id,
      patientId: medicalRecord.patientId,
      createdAt: medicalRecord.createdAt,
      doctorId: medicalRecord.doctorId,
    };
  });
  return result;
};

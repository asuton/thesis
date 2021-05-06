import { createQueryBuilder } from "typeorm";
import { DiagnosticTesting } from "../models";

export const getPatientsDiagnosticTestings = async (
  id: string
): Promise<DiagnosticTesting[] | undefined> => {
  return await createQueryBuilder<DiagnosticTesting>("DiagnosticTesting")
    .where("DiagnosticTesting.patientId = :id", { id: id })
    .leftJoinAndMapOne(
      "DiagnosticTesting.doctor",
      "Doctor",
      "Doctor",
      "DiagnosticTesting.doctorId = Doctor.id"
    )
    .select([
      "DiagnosticTesting.id",
      "DiagnosticTesting.doctorId",
      "DiagnosticTesting.patientId",
      "DiagnosticTesting.test",
      "DiagnosticTesting.result",
      "DiagnosticTesting.createdAt",
      "Doctor.name",
      "Doctor.surname",
    ])
    .getMany();
};

export const getPatientsDiagnosticTesting = async (
  id: string,
  patientId: string
): Promise<DiagnosticTesting | undefined> => {
  return await createQueryBuilder<DiagnosticTesting>("DiagnosticTesting")
    .where("DiagnosticTesting.patientId = :patientId", { patientId: patientId })
    .andWhere("DiagnosticTesting.id = :id", { id: id })
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
      "DiagnosticTesting.id",
      "DiagnosticTesting.doctorId",
      "DiagnosticTesting.patientId",
      "DiagnosticTesting.test",
      "DiagnosticTesting.result",
      "DiagnosticTesting.createdAt",
      "Doctor.name",
      "Doctor.surname",
      "Patient.name",
      "Patient.surname",
      "Patient.OIB",
      "Patient.dateOfBirth",
    ])
    .getOne();
};

export const insertDiagnosticTesting = (
  form: DiagnosticTesting,
  doctorId: string,
  patientId: string
): DiagnosticTesting => {
  let diagnosticTesting = new DiagnosticTesting();

  diagnosticTesting.patientId = patientId;
  diagnosticTesting.doctorId = doctorId;
  diagnosticTesting.test = form.test;
  diagnosticTesting.result = form.result;

  return diagnosticTesting;
};

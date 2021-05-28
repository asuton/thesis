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
  id: string
): Promise<DiagnosticTesting | undefined> => {
  return await createQueryBuilder<DiagnosticTesting>("DiagnosticTesting")
    .where("DiagnosticTesting.id = :id", { id: id })
    .leftJoinAndMapOne(
      "DiagnosticTesting.doctor",
      "Doctor",
      "Doctor",
      "DiagnosticTesting.doctorId = Doctor.id"
    )
    .leftJoinAndMapOne(
      "DiagnosticTesting.patient",
      "Patient",
      "Patient",
      "DiagnosticTesting.patientId = Patient.id"
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

export const getDiagnosticTestingsList = async (id: string) => {
  const diagnosticTestings = await DiagnosticTesting.find({ patientId: id });
  let result: any = diagnosticTestings.map((diagnosticTesting) => {
    return {
      test: diagnosticTesting.test,
      id: diagnosticTesting.id,
      patientId: diagnosticTesting.patientId,
      createdAt: diagnosticTesting.createdAt,
    };
  });
  return result;
};

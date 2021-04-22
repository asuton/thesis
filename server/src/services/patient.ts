import { createQueryBuilder } from "typeorm";
import Patient from "../models/Patient";

export const getPatientsQuery = async (): Promise<Patient[] | undefined> => {
  const patient = await createQueryBuilder("Patient")
    .select([
      "patient.id",
      "patient.name",
      "patient.surname",
      "patient.address",
      "patient.OIB",
      "patient.phone",
      "patient.email",
      "patient.dateOfBirth",
    ])
    .from(Patient, "patient")
    .getMany();
  return patient;
};

export const getPatientByIdQuery = async (
  id: string
): Promise<Patient | undefined> => {
  const patient = await createQueryBuilder("Patient")
    .select([
      "patient.id",
      "patient.name",
      "patient.surname",
      "patient.address",
      "patient.OIB",
      "patient.phone",
      "patient.email",
      "patient.dateOfBirth",
    ])
    .from(Patient, "patient")
    .where("patient.id = :id", { id: id })
    .getOne();
  return patient;
};

export const getPatientByEmailQuery = async (
  email: string
): Promise<Patient | undefined> => {
  const patient = await createQueryBuilder("Patient")
    .select([
      "patient.id",
      "patient.name",
      "patient.surname",
      "patient.address",
      "patient.OIB",
      "patient.phone",
      "patient.email",
      "patient.dateOfBirth",
    ])
    .from(Patient, "patient")
    .where("patient.email = :email", { email: email })
    .getOne();
  return patient;
};

export const insertPatientQuery = (form: Patient): Patient => {
  let patient = new Patient();
  patient.name = form.name;
  patient.surname = form.surname;
  patient.address = form.address;
  patient.dateOfBirth = form.dateOfBirth;
  patient.OIB = form.OIB;
  patient.phone = form.phone;
  patient.email = form.email;
  patient.password = form.password;
  return patient;
};

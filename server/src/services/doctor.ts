import { createQueryBuilder } from "typeorm";
import Doctor from "../models/Doctor";

export const getDoctorsQuery = async (): Promise<Doctor[] | undefined> => {
  const doctor = await createQueryBuilder("Doctor")
    .select([
      "doctor.id",
      "doctor.name",
      "doctor.surname",
      "doctor.license",
      "doctor.qualification",
      "doctor.OIB",
      "doctor.phone",
      "doctor.email",
    ])
    .from(Doctor, "doctor")
    .getMany();
  return doctor;
};

export const getDoctorByIdQuery = async (
  id: string
): Promise<Doctor | undefined> => {
  const doctor = await createQueryBuilder("Doctor")
    .select([
      "doctor.id",
      "doctor.name",
      "doctor.surname",
      "doctor.license",
      "doctor.qualification",
      "doctor.OIB",
      "doctor.phone",
      "doctor.email",
      "doctor.webAuthnRegistered",
    ])
    .from(Doctor, "doctor")
    .where("doctor.id = :id", { id: id })
    .getOne();
  return doctor;
};

export const getDoctorByEmailQuery = async (
  email: string
): Promise<Doctor | undefined> => {
  const doctor = await createQueryBuilder("Doctor")
    .select([
      "doctor.id",
      "doctor.name",
      "doctor.surname",
      "doctor.license",
      "doctor.qualification",
      "doctor.OIB",
      "doctor.phone",
      "doctor.email",
    ])
    .from(Doctor, "doctor")
    .where("doctor.email = :email", { email: email })
    .getOne();
  return doctor;
};

export const insertDoctorQuery = (form: Doctor): Doctor => {
  let doctor = new Doctor();
  doctor.name = form.name;
  doctor.surname = form.surname;
  doctor.qualification = form.qualification;
  doctor.license = form.license;
  doctor.OIB = form.OIB;
  doctor.phone = form.phone;
  doctor.email = form.email;
  doctor.password = form.password;
  return doctor;
};

export const insertDoctorAuthInfoQuery = async (
  authenticators: any,
  id: string
) => {
  const doctor = await Doctor.findOne(id);
  if (doctor) {
    console.log(authenticators);
    (await doctor.authenticator).push(authenticators);
    doctor.webAuthnRegistered = true;
    return Doctor.save(doctor);
  } else {
    return "nop";
  }
};

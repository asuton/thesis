import { Patient, Doctor, Authenticator } from "../models";
import { Authr } from "../types/webauthn";
import { getPatientByIdQuery } from "./patient";
import { getDoctorByIdQuery } from "./doctor";

export const findUserById = async (id: string) => {
  let user: Patient | Doctor | undefined = await Patient.findOne(id);
  if (!user) {
    user = await Doctor.findOne(id);
  }
  return user;
};

export const findUserByEmail = async (email: string) => {
  let user: Patient | Doctor | undefined = await Patient.findOne({
    email: email,
  });
  if (!user) {
    user = await Doctor.findOne({
      email: email,
    });
  }
  return user;
};

export const insertAuthInfoQuery = async (
  authenticator: Authr,
  id: string
): Promise<Patient | Doctor> => {
  const user = await findUserById(id);
  const authr = await Authenticator.create(authenticator).save();
  if (!user) {
    throw new Error("Could not find user");
  }
  (await user.authenticator).push(authr);

  user.webAuthnRegistered = true;

  return user.save();
};

export const getUserById = async (
  id: string
): Promise<Patient | Doctor | undefined> => {
  let user: Patient | Doctor | undefined;
  user = await getPatientByIdQuery(id);
  if (!user) {
    user = await getDoctorByIdQuery(id);
  }
  return user;
};

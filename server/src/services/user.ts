import { Patient, Doctor, Authenticator, Admin } from "../entities";
import { Authr } from "../types/webauthn";
import { getPatientByIdQuery } from "./patient";
import { getDoctorByIdQuery } from "./doctor";
import { Authorization } from "../utils/constants";
import { checkIfOnlyAdmin, getAdminByIdQuery } from "./admin";

export const findUserById = async (id: string) => {
  let user: Patient | Doctor | Admin | undefined = await Patient.findOne(id);
  if (user && user.authorization !== Authorization.Patient) {
    throw new Error("Invalid authorization");
  }
  if (!user) {
    user = await Doctor.findOne(id);
    if (user && user.authorization !== Authorization.Doctor) {
      throw new Error("Invalid authorization");
    }
  }
  if (!user) {
    user = await Admin.findOne(id);
    const only = await checkIfOnlyAdmin();
    if (!only) {
      throw new Error();
    }
  }
  return user;
};

export const findUserByEmail = async (email: string) => {
  let user: Patient | Doctor | Admin | undefined = await Patient.findOne({
    email: email,
  });
  if (user && user.authorization !== Authorization.Patient) {
    throw new Error("Invalid authorization");
  }
  if (!user) {
    user = await Doctor.findOne({
      email: email,
    });
    if (user && user.authorization !== Authorization.Doctor) {
      throw new Error("Invalid authorization");
    }
  }
  if (!user) {
    user = await Admin.findOne({
      email: email,
    });
  }
  return user;
};

export const insertAuthInfoQuery = async (
  authenticator: Authr,
  id: string
): Promise<Patient | Doctor | Admin> => {
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
): Promise<Patient | Doctor | Admin | undefined> => {
  let user: Patient | Doctor | Admin | undefined;
  user = await getPatientByIdQuery(id);
  if (!user) {
    user = await getDoctorByIdQuery(id);
  }
  if (!user) {
    user = await getAdminByIdQuery(id);
    const only = await checkIfOnlyAdmin();
    if (!only) {
      throw new Error();
    }
  }
  return user;
};

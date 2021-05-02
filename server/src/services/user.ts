import { Patient, Doctor, Authenticator } from "../models";
import { Authr } from "../types/webauthn";

export const findUser = async (id: string) => {
  try {
    let user: Patient | Doctor | undefined = await Patient.findOne(id);
    if (!user) {
      user = (await Doctor.findOne(id)) as Doctor;
    }
    return user;
  } catch (err) {
    throw new Error("User not found");
  }
};

export const insertAuthInfoQuery = async (authenticator: Authr, id: string) => {
  try {
    const user = await findUser(id);
    const authr = await Authenticator.create(authenticator).save();

    (await user.authenticator).push(authr);

    user.webAuthnRegistered = true;

    return user.save();
  } catch (err) {
    throw new Error("Could not insert authenticator");
  }
};

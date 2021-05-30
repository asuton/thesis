import { createQueryBuilder } from "typeorm";
import { Admin } from "../models";

export const getAdminByIdQuery = async (
  id: string
): Promise<Admin | undefined> => {
  const admin = await createQueryBuilder<Admin>("Admin")
    .select([
      "admin.id",
      "admin.email",
      "admin.authorization",
      "admin.webAuthnRegistered",
    ])
    .from(Admin, "admin")
    .where("admin.id = :id", { id: id })
    .getOne();
  return admin;
};

export const checkIfOnlyAdmin = async () => {
  const admin = await Admin.find();
  if (admin) {
    if (admin.length > 1) {
      throw new Error("Multiple admins registered!");
    } else return true;
  } else false;
};

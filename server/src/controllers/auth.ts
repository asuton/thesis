import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, Authorization } from "../utils/constants";
import { Doctor, Patient } from "../models";
import {
  defineRulesForPatient,
  defineRulesForDoctor,
  AppAbility,
} from "../auth/abilities";
import { packRules, PackRule } from "@casl/ability/extra";
import { RawRuleOf } from "@casl/ability";

export interface ILogin {
  id: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  let rules: PackRule<RawRuleOf<AppAbility>>[];

  const { email, password } = req.body;

  let user: ILogin | undefined = await Patient.findOne({
    email: email,
  });
  let authorization = Authorization.Patient;

  if (!user) {
    user = await Doctor.findOne({ email: email });
    authorization = Authorization.Doctor;
  }

  if (!user) {
    return res.status(401).send("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send("Invalid Credentials");
  }
  if (authorization === Authorization.Patient) {
    rules = packRules(defineRulesForPatient(user));
  } else {
    rules = packRules(defineRulesForDoctor(user));
  }
  const token = jwt.sign({ id: user.id, rules: rules }, JWT_SECRET);

  return res.status(201).json({
    id: user.id,
    rules: rules,
    token,
  });
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, Authorization } from "../utils/constants";
import { Doctor, Patient } from "../models";
import { defineRulesFor, AppAbility } from "../auth/abilities";
import { packRules, PackRule } from "@casl/ability/extra";
import { RawRuleOf } from "@casl/ability";

export interface ILogin {
  id: string;
  password: string;
  authorization: Authorization;
}

export const login = async (req: Request, res: Response) => {
  let rules: PackRule<RawRuleOf<AppAbility>>[];

  const { email, password } = req.body;

  let user: ILogin | undefined = await Patient.findOne({
    email: email,
  });

  if (!user) {
    user = await Doctor.findOne({ email: email });
  }

  if (!user) {
    return res.status(401).send("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send("Invalid Credentials");
  }

  rules = packRules(defineRulesFor(user));

  const token = jwt.sign({ id: user.id, rules: rules }, JWT_SECRET);

  return res.status(201).json({
    id: user.id,
    rules: rules,
    token,
  });
};

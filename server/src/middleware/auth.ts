import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { unpackRules, PackRule } from "@casl/ability/extra";
import { RawRuleOf } from "@casl/ability";
import { AppAbility, createAbility } from "../services/abilities";

export interface IAuthToken {
  id: string;
  rules: PackRule<RawRuleOf<AppAbility>>[];
}

export const authJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).send("Missing authJWT token. Not authorized.");
    }

    const response = jwt.verify(token, JWT_SECRET) as IAuthToken;

    req.id = response.id;
    const rules = unpackRules(response.rules);
    req.ability = createAbility(rules);

    next();
  } catch (err) {
    return res.status(500).send("Not authorized");
  }
};

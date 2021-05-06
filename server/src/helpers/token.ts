import jwt from "jsonwebtoken";
import { RawRuleOf } from "@casl/ability";
import { packRules } from "@casl/ability/extra";
import { AppAbility } from "../services/abilities";
import { JWT_SECRET } from "../utils/constants";

export const signToken = (
  id: string,
  rules: RawRuleOf<AppAbility>[]
): string => {
  return jwt.sign(
    {
      id: id,
      rules: packRules(rules),
    },
    JWT_SECRET,
    { expiresIn: 360000 }
  );
};

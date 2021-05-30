import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { defineRulesFor, AppAbility } from "../services/abilities";
import { findUserByEmail, getUserById } from "../services/user";
import { packRules, PackRule } from "@casl/ability/extra";
import { RawRuleOf } from "@casl/ability";

export const login = async (req: Request, res: Response) => {
  let rules: PackRule<RawRuleOf<AppAbility>>[];

  if (!req.body || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: [{ msg: "Missing email and/or password" }] });
  }
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: [{ msg: "Invalid credentials" }] });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: [{ msg: "Invalid credentials" }] });
  }

  rules = packRules(defineRulesFor(user));

  const token = jwt.sign({ id: user.id, rules: rules }, JWT_SECRET);

  return res.status(201).json({
    id: user.id,
    rules: rules,
    token,
    webAuthnRegistered: user.webAuthnRegistered,
  });
};

export const auth = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const session = async (req: Request, res: Response) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(500).send("Session not defined");
    }
    if (req.session.user !== req.id) {
      return res.status(400).send("Invalid session");
    }
    if (req.session.loggedIn) return res.status(200).json(req.session.loggedIn);
    else return res.status(400).send("Something went wrong");
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (req.session && req.session.loggedIn) {
      res.cookie("session", "", { maxAge: 0 });
      return res.status(200).send("Logged out");
    } else return res.status(200).send("Logged out");
  } catch (err) {
    res.status(500).json({ error: [{ msg: "Server error logging out" }] });
  }
};

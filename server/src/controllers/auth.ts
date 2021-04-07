import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { Doctor, Patient } from "../models";

export interface ILogin {
  id: string;
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
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

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

  return res.status(201).json({
    id: user.id,
    email: user.email,
    token,
  });
};

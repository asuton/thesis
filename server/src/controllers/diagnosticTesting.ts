import { Request, Response } from "express";
import { validate } from "class-validator";
import { DiagnosticTesting } from "../models";

export const getDiagnosticTests = async (_req: Request, res: Response) => {
  try {
    const diagnosticTests = await DiagnosticTesting.find();
    return res.json(diagnosticTests);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getDiagnosticTest = async (req: Request, res: Response) => {
  try {
    const diagnosticTest = await DiagnosticTesting.findOne({
      id: req.params.testId,
    });
    if (!diagnosticTest) {
      return res.status(400).json({ msg: "Test not found" });
    }
    return res.json(diagnosticTest);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postDiagnosticTest = async (req: Request, res: Response) => {
  try {
    let diagnosticTest = new DiagnosticTesting();

    Object.assign(diagnosticTest, req.body);

    const errors = await validate(diagnosticTest);
    if (errors.length > 0) {
      return res.status(500).send(errors);
    }

    const response = await DiagnosticTesting.save(diagnosticTest);
    return res.json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

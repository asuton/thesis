import { Request, Response } from "express";
import { validate } from "class-validator";
import { DiagnosticTesting } from "../models";
import { ForbiddenError, subject } from "@casl/ability";
import {
  getPatientsDiagnosticTestings,
  getPatientsDiagnosticTesting,
  insertDiagnosticTesting,
} from "../services/diagnosticTesting";

export const getDiagnosticTests = async (req: Request, res: Response) => {
  try {
    const diagnosticTests = await getPatientsDiagnosticTestings(
      req.params.patId
    );

    if (diagnosticTests) {
      ForbiddenError.from(req.ability).throwUnlessCan(
        "read",
        subject("DiagnosticTesting", diagnosticTests)
      );
    }

    return res.json(diagnosticTests);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const getDiagnosticTest = async (req: Request, res: Response) => {
  try {
    const diagnosticTest = await getPatientsDiagnosticTesting(
      req.params.testId,
      req.params.patId
    );

    if (!diagnosticTest) {
      return res.status(400).json({
        error: [
          {
            msg: "Test not found",
          },
        ],
      });
    }

    ForbiddenError.from(req.ability).throwUnlessCan(
      "read",
      subject("DiagnosticTesting", diagnosticTest)
    );

    return res.json(diagnosticTest);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const postDiagnosticTest = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.test || !req.body.result) {
      return res.status(400).json({
        error: [
          {
            msg: "Invalid request body, missing one or more of fields: test, result",
          },
        ],
      });
    }

    let diagnosticTest = insertDiagnosticTesting(
      req.body,
      req.id,
      req.params.patId
    );

    ForbiddenError.from(req.ability).throwUnlessCan(
      "create",
      subject("DiagnosticTesting", diagnosticTest)
    );

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

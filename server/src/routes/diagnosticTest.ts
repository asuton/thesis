import express from "express";
import {
  getDiagnosticTest,
  getDiagnosticTests,
  postDiagnosticTest,
} from "../controllers/diagnosticTesting";

const router = express.Router();

router.get("/:patId/tests", getDiagnosticTest);
router.get("/:patId/tests/:testId", getDiagnosticTests);
router.post("/:patId/tests", postDiagnosticTest);

export default router;

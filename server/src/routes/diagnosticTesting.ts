import express from "express";
import {
  getDiagnosticTest,
  getDiagnosticTests,
  postDiagnosticTest,
} from "../controllers/diagnosticTesting";
import { authJWT } from "../middleware/auth";

const router = express.Router();

router.get("/:patId/tests", authJWT, getDiagnosticTests);
router.get("/:patId/tests/:testId", authJWT, getDiagnosticTest);
router.post("/:patId/tests", authJWT, postDiagnosticTest);

export default router;

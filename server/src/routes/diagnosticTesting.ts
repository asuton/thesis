import express from "express";
import {
  getDiagnosticTest,
  getDiagnosticTests,
  postDiagnosticTest,
} from "../controllers/diagnosticTesting";
import { authJWT } from "../middleware/auth";
import { webAuthn } from "../middleware/webauthn";

const router = express.Router();

router.get("/:patId/tests", authJWT, webAuthn, getDiagnosticTests);
router.get("/tests/:testId", authJWT, webAuthn, getDiagnosticTest);
router.post("/:patId/tests", authJWT, webAuthn, postDiagnosticTest);

export default router;

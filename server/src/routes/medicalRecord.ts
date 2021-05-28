import express from "express";
import {
  getMedicalRecords,
  getMedicalRecord,
  postMedicalRecord,
  putMedicalRecord,
} from "../controllers/medicalRecord";
import { authJWT } from "../middleware/auth";
import { webAuthn } from "../middleware/webauthn";

const router = express.Router();

router.get("/:patId/records", authJWT, webAuthn, getMedicalRecords);
router.get("/records/:medId", authJWT, webAuthn, getMedicalRecord);
router.post("/:patId/records", authJWT, webAuthn, postMedicalRecord);
router.put("/records/:medId", authJWT, webAuthn, putMedicalRecord);

export default router;

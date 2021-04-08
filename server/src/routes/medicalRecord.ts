import express from "express";
import {
  getMedicalRecords,
  getMedicalRecord,
  postMedicalRecord,
  putMedicalRecord,
} from "../controllers/medicalRecord";
import { authJWT } from "../middleware/auth";
const router = express.Router();

router.get("/:patId/records", getMedicalRecords);
router.get("/:patId/records/:medId", getMedicalRecord);
router.post("/:patId/records", authJWT, postMedicalRecord);
router.put("/:patId/records/:medId", putMedicalRecord);

export default router;

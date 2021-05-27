import express from "express";
import {
  getPatients,
  getPatient,
  postPatient,
  putPatient,
} from "../controllers/patient";
import { authJWT } from "../middleware/auth";
import { webAuthn } from "../middleware/webauthn";

const router = express.Router();

router.get("/", authJWT, getPatients);
router.get("/:id", authJWT, getPatient);
router.post("/", postPatient);
router.put("/:id", authJWT, webAuthn, putPatient);

export default router;

import express from "express";
import {
  getPatients,
  getPatient,
  postPatient,
  putPatient,
} from "../controllers/patient";
import { authJWT } from "../middleware/auth";

const router = express.Router();

router.get("/", authJWT, getPatients);
router.get("/:id", getPatient);
router.post("/", postPatient);
router.put("/:id", putPatient);

export default router;

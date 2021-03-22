import express from "express";
import {
  getPatients,
  getPatient,
  postPatient,
  putPatient,
} from "../controllers/patient";

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", postPatient);
router.put("/:id", putPatient);

export default router;

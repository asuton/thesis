import express from "express";
import {
  getTakenAppointmentsForDoctor,
  postAppointment,
  getAppointments,
  deleteAppointment,
} from "../controllers/appointment";
import { authJWT } from "../middleware/auth";
const router = express.Router();

router.get("/", authJWT, getAppointments);
router.get("/:docId/taken", authJWT, getTakenAppointmentsForDoctor);
router.post("/:docId", authJWT, postAppointment);
router.delete("/:id", authJWT, deleteAppointment);

export default router;

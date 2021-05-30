import express from "express";
import {
  getDoctors,
  getDoctor,
  postDoctor,
  putDoctor,
} from "../controllers/doctor";
import { authJWT } from "../middleware/auth";
import { webAuthn } from "../middleware/webauthn";

const router = express.Router();

router.get("/", authJWT, getDoctors);
router.get("/:id", authJWT, getDoctor);
router.post("/", postDoctor);
router.put("/:id", authJWT, webAuthn, putDoctor);

export default router;

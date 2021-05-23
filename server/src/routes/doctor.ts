import express from "express";
import {
  getDoctors,
  getDoctor,
  postDoctor,
  putDoctor,
} from "../controllers/doctor";
import { authJWT } from "../middleware/auth";

const router = express.Router();

router.get("/", authJWT, getDoctors);
router.get("/:id", authJWT, getDoctor);
router.post("/", authJWT, postDoctor);
router.put("/:id", authJWT, putDoctor);

export default router;

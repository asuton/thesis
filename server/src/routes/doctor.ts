import express from "express";
import {
  getDoctors,
  getDoctor,
  postDoctor,
  putDoctor,
} from "../controllers/doctor";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", postDoctor);
router.put("/:id", putDoctor);

export default router;

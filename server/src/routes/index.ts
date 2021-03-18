import express from "express";
import { setup } from "../controllers/setup";

const router = express.Router();

router.get("/", setup);

export default router;

import express from "express";
import { login, auth } from "../controllers/auth";
import { authJWT } from "../middleware/auth";
const router = express.Router();

router.post("/", login);
router.get("/auth", authJWT, auth);

export default router;

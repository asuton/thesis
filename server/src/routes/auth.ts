import express from "express";
import { login, auth, session, logout } from "../controllers/auth";
import { authJWT } from "../middleware/auth";
const router = express.Router();

router.post("/", login);
router.get("/auth", authJWT, auth);
router.get("/webauthn", authJWT, session);
router.get("/logout", authJWT, logout);

export default router;

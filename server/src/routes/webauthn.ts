import express from "express";
import {
  generateServerMakeCredRequest,
  checkWebAuthnResponse,
  webAuthnLogin,
} from "../controllers/webauthn";
import { authJWT } from "../middleware/auth";

const router = express.Router();

router.get("/register", authJWT, generateServerMakeCredRequest);
router.post("/response", authJWT, checkWebAuthnResponse);
router.get("/login", authJWT, webAuthnLogin);

export default router;

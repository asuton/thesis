import express from "express";
import {
  generateServerMakeCredRequest,
  checkWebAuthnResponse,
  webAuthnLogin,
  dummyRoute,
} from "../controllers/webauthn";
import { authJWT } from "../middleware/auth";

const router = express.Router();

router.get("/register", authJWT, generateServerMakeCredRequest);
router.post("/response", authJWT, checkWebAuthnResponse);
router.get("/login", authJWT, webAuthnLogin);
router.get("/dummy", authJWT, dummyRoute);

export default router;

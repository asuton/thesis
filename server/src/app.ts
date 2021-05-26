import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import "reflect-metadata";
import {
  patientRoute,
  doctorRoute,
  medicalRecordRoute,
  diagnosticTestRoute,
  auth,
  webauthn,
  appointmentRoute,
} from "./routes";
import { COOKIE_KEY } from "./utils/constants";

const app: Application = express();

app.use(
  cookieSession({
    name: "session",
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.get("/", (_req: Request, res: Response) => res.send("API Running"));
app.use("/patients", patientRoute);
app.use("/doctors", doctorRoute);
app.use("/patients", medicalRecordRoute);
app.use("/patients", diagnosticTestRoute);
app.use("/login", auth);
app.use("/webauthn", webauthn);
app.use("/appointment", appointmentRoute);
export default app;

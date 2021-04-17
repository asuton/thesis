import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import {
  patientRoute,
  doctorRoute,
  medicalRecordRoute,
  diagnosticTestRoute,
  auth,
} from "./routes";

const app: Application = express();

app.use(cors());
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

export default app;

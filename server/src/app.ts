import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import "reflect-metadata";
import patientRoute from "./routes/patient";
import doctorRoute from "./routes/doctor";
import medicalRecordRoute from "./routes/medicalRecord";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => res.send("API Running"));
app.use("/patients", patientRoute);
app.use("/doctors", doctorRoute);
app.use("/patients", medicalRecordRoute);

export default app;

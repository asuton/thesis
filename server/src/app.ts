import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import setupRoute from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => res.send("API Running"));
app.use("/setup", setupRoute);

export default app;

import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT) as number;
export const POSTGRES_HOST = process.env.POSTGRES_HOST as string;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) as number;
export const POSTGRES_USER = process.env.POSTGRES_USER as string;
export const POSTGRES_DB = process.env.POSTGRES_DB as string;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const KEY = process.env.KEY as string;
export const COOKIE_KEY = process.env.COOKIE_KEY as string;

export enum Authorization {
  Doctor = "DOCTOR",
  Patient = "PATIENT",
  Admin = "ADMIN",
}

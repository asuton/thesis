import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from "../utils/constants";

dotenv.config();

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: POSTGRES_PORT || 5432,
  username: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "postgres",
  database: POSTGRES_DB || "postgres",
  entities: [],
  synchronize: true,
};

export const connectDB = async () => {
  await createConnection(dbConfig)
    .then((_connection) => {
      console.log("Connected to Postgres");
    })
    .catch((err) => {
      console.log("Unable to connect to Postgres", err);
      process.exit(1);
    });
};

export default connectDB;

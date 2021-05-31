import { createConnection } from "typeorm";

export const connectDB = async () => {
  await createConnection()
    .then((_connection) => {
      console.log("Connected to Postgres");
    })
    .catch((err) => {
      console.log("Unable to connect to Postgres", err);
      process.exit(1);
    });
};

export default connectDB;

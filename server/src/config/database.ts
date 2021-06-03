import { createTypeormConnection } from "./createTypeormConnection";

export const connectDB = async () => {
  await createTypeormConnection()
    .then((_connection) => {
      console.log("Connected to Postgres");
    })
    .catch((err) => {
      console.log("Unable to connect to Postgres", err);
      process.exit(1);
    });
};

export default connectDB;

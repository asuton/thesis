import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
} from "./src/utils/constants";

export = [
  {
    name: "development",
    enviroment: "dev",
    type: "postgres",
    host: POSTGRES_HOST || "localhost",
    port: POSTGRES_PORT || 5432,
    username: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || "postgres",
    database: POSTGRES_DB || "postgres",
    entities: ["./src/entities/*.ts"],
    seeds: ["./src/seeds/*.ts"],
    factories: ["src/factories/*.ts"],
    synchronize: true,
  },
  {
    name: "test",
    enviroment: "test",
    type: "postgres",
    host: POSTGRES_HOST || "localhost",
    port: POSTGRES_PORT || 5432,
    username: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || "postgres",
    database: POSTGRES_DB_TEST || "postgres",
    entities: ["./src/entities/*.ts"],
    seeds: ["./src/seeds/*.ts"],
    factories: ["src/factories/*.ts"],
    synchronize: true,
    dropSchema: true,
  },
];

import { config } from "dotenv";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { POSTGRES_PORT } from "../common/constants";
import { getEnvPath } from "../common/utils/misc-utils";

config({ path: getEnvPath() });

export const dataSourceOptions: PostgresConnectionOptions = {
  type: "postgres",
  schema: "soul_keep",
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migrations/*.js"],
  migrationsTableName: "migrations",
  synchronize: false,
  ssl: { ca: process.env.CERT },
  // ...(process.env.NODE_ENV !== "local" && { ssl: { ca: process.env.CERT } }),
};

export const dataSource = new DataSource(dataSourceOptions);

(async () => {
  await dataSource.initialize();
})();

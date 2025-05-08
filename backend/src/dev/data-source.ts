import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "ep-little-lake-a1ml6hc2-pooler.ap-southeast-1.aws.neon.tech",
  port: 5432,
  username: "neondb_owner",
  password: "npg_oFD1RQZLmck8",
  database: "konfigo",
  entities: ["./src/entities/*.entity{.ts,.js}"],
  migrations: ["./src/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
});

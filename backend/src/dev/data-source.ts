import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "konfigo",
  password: "super_secure_password",
  database: "konfigo",
  entities: ["./src/entities/*.entity{.ts,.js}"],
  migrations: ["./src/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations",
});

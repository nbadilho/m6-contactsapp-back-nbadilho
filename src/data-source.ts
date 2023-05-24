import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Contact } from "./entities/contact.entity";
import { InitialMigration1684893292424 } from "./migrations/1684893292424-InitialMigration";

const setDataSourceConfig = (): DataSourceOptions => {
	const nodeEnv = process.env.NODE_ENV;
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }

	if (nodeEnv === "production") {
		return {
			type: "postgres",
			url: dbUrl,
			entities: [User,Contact],
			migrations: [InitialMigration1684893292424],
		};
	}
	if (nodeEnv === "test") {
		return {
			type: "sqlite",
			database: ":memory:",
			entities: [User,Contact],
			synchronize: true,
		};
	}
	return {
		type: "postgres",
		synchronize: false,
    url: dbUrl,
		logging: true,
		entities: [User,Contact],
		migrations: [InitialMigration1684893292424],
	};
};

export const AppDataSource = new DataSource(setDataSourceConfig());
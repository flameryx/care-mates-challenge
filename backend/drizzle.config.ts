import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	dbCredentials: {
		url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

import dotenv from "dotenv";

dotenv.config();

export const SERVER_CONFIG = {
	port: process.env.PORT || 3000,
	environment: process.env.NODE_ENV || "development",
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV === "development",
	isTest: process.env.NODE_ENV === "test",
};

export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"];

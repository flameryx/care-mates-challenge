import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Server configuration
export const SERVER_CONFIG = {
	port: process.env.PORT || 3000,
	environment: process.env.NODE_ENV || "development",
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV === "development",
	isTest: process.env.NODE_ENV === "test",
};

// Export other configuration constants as needed
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"];

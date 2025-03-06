import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import formRouter from "./form.routes.js";
import careTypesRouter from "./careTypes.routes.js";
import { CORS_ORIGINS } from "../config/server.js";

// Create main router
const apiRouter = new Hono();

// Apply middleware
apiRouter.use("*", logger());
apiRouter.use("*", cors({ origin: CORS_ORIGINS }));

// Health check endpoint
apiRouter.get("/", (c) => c.json({ status: "ok", message: "API is running" }));

// Mount routes
apiRouter.route("/careTypes", careTypesRouter);
apiRouter.route("/form", formRouter);

// Handle 404 for API routes
apiRouter.notFound((c) => {
	return c.json({ success: false, message: "Endpoint not found" }, 404);
});

export default apiRouter;

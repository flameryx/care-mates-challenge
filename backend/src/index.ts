import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import apiRouter from "./routes/index.js";
import { SERVER_CONFIG } from "./config/server.js";
import "./db/db.js";

const app = new Hono();

app.use(
	"/*",
	cors({
		origin: ["http://localhost:5173", "http://care-mates-frontend.s3-website.eu-north-1.amazonaws.com"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
		maxAge: 600,
		credentials: true,
	})
);

app.route("/api", apiRouter);

const port = SERVER_CONFIG.port;
console.log(`Starting server in ${SERVER_CONFIG.environment} mode`);

serve(
	{
		fetch: app.fetch,
		port: Number(port),
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);

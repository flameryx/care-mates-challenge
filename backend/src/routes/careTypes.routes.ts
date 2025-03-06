import { Hono } from "hono";
import { db } from "../db/db.js";
import { careTypes } from "../db/schema.js";
import { CareTypesController } from "../controllers/careTypes.controller.js";

const careTypesController = new CareTypesController();
const careTypesRouter = new Hono();

careTypesRouter.get("/", careTypesController.getAllCareTypeNames);

export default careTypesRouter;

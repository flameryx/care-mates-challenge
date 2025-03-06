import { Context } from "hono";
import { careTypes } from "../db/schema.js";
import { db } from "../db/db.js";

export class CareTypesController {
	async getAllCareTypeNames(c: Context) {
		try {
			const results = await db.select({ name: careTypes.name }).from(careTypes);
			console.log("All care types successfully fetched.");
			return c.json({ data: results }, 200);
		} catch (error) {
			console.log("Error getting all care types", error);
			return c.json({ message: "Failed to get all care types" }, 500);
		}
	}
}

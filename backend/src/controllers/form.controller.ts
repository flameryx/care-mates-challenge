import { Context } from "hono";
import { db } from "../db/db.js";
import { careTypes, facilities, facilityCareTypeMatch } from "@/db/schema.js";
import { eq, lte, gte, and, sql } from "drizzle-orm";
import FacilityService from "../services/facility.service.js";

const facilityService = new FacilityService();

export class FormController {
	async validateName(c: Context) {
		try {
			const name = c.req.param("name").trim();

			if (name.length == 0) {
				return c.json({ message: "Name should have at least 1 character." }, 400);
			} else if (name.length > 100) {
				return c.json({ message: "Input is too long for a name." }, 400);
			} else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
				return c.json({ message: "Name can only contain letters, spaces, hyphens, and apostrophes" }, 400);
			}

			console.log("Form name was successfully validated.");
			return c.json({}, 200);
		} catch (error) {
			console.log("Error validating form name:", error);
			return c.json({ success: false, message: "Failed to validate name." }, 500);
		}
	}

	async validateCareType(c: Context) {
		try {
			const careType = c.req.param("careType");

			let results = await facilityService.getFacilityNamesByCareType(careType);

			if (results.length == 0) {
				return c.json({ message: "No facilities were found for that care type." }, 404);
			}

			console.log("Form care type was successfully validated.");
			return c.json({}, 200);
		} catch (error) {
			console.log("Error validating care type:", error);
			return c.json({ message: "Failed to validate care type." }, 500);
		}
	}

	async searchMatchingFacility(c: Context) {
		try {
			const userZipCode = Number(c.req.param("zipCode"));

			if (isNaN(userZipCode)) {
				return c.json({ message: "Zip code must be a number." }, 400);
			}

			const careType = c.req.param("careType");

			let results = await facilityService.getAvailableFacilitiesByCareTypeAndUserZipCode(careType, userZipCode);
			results = results.sort((a, b) => a.zipCodeDistance - b.zipCodeDistance);

			if (results.length == 0) {
				return c.json({ message: "No available facilities were found with that care type near your area." }, 404);
			}

			const closestFacility = results[0];

			if (closestFacility.zipCodeDistance > 3000) {
				return c.json({ message: "No available facilities were found with that care type near your area." }, 404);
			}

			console.log("Found matching facility for user:", closestFacility);
			return c.json({ data: closestFacility }, 200);
		} catch (error) {
			console.log("Error validating zip code:", error);
			return c.json({ message: "Failed to validate zip code." }, 500);
		}
	}
}

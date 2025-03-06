import { db } from "./db.js";
import { facilities, capacity, careTypes, facilityCareTypeMatch } from "./schema.js";

async function seedDatabase() {
	try {
		await db.insert(capacity).values([{ name: "Full" }, { name: "Available" }]);

		await db.insert(careTypes).values([{ name: "Stationary" }, { name: "Ambulatory" }, { name: "Day Care" }]);

		await db.insert(facilities).values([
			{ name: "A", zipCode: 12000, servesFromZipCode: 10000, servesToZipCode: 14999, capacityType: "Full" },
			{ name: "B", zipCode: 17000, servesFromZipCode: 15000, servesToZipCode: 19999, capacityType: "Available" },
			{ name: "C", zipCode: 22000, servesFromZipCode: 20000, servesToZipCode: 24999, capacityType: "Full" },
			{ name: "D", zipCode: 27000, servesFromZipCode: 25000, servesToZipCode: 29999, capacityType: "Available" },
			{ name: "E", zipCode: 18000, servesFromZipCode: 10000, servesToZipCode: 24999, capacityType: "Available" },
		]);

		await db.insert(facilityCareTypeMatch).values([
			{ facilityName: "A", careTypeName: "Stationary" },
			{ facilityName: "B", careTypeName: "Stationary" },
			{ facilityName: "C", careTypeName: "Ambulatory" },
			{ facilityName: "D", careTypeName: "Ambulatory" },
			{ facilityName: "E", careTypeName: "Stationary" },
			{ facilityName: "E", careTypeName: "Ambulatory" },
		]);

		console.log("All default records inserted successfully!");
	} catch (error) {
		console.log("Error while inserting default records.");
	}
}

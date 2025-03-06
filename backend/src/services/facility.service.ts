import { db } from "../db/db.js";
import { facilities, facilityCareTypeMatch, Facility } from "../db/schema.js";
import { eq, and, lte, gte } from "drizzle-orm";

class FacilityDistance {
	facilityName: string;
	careTypeName: string;
	zipCode: number;
	zipCodeDistance: number;

	constructor(facilityName: string, careTypeName: string, zipCode: number, zipCodeDistance: number) {
		this.facilityName = facilityName;
		this.careTypeName = careTypeName;
		this.zipCode = zipCode;
		this.zipCodeDistance = zipCodeDistance;
	}
}

export default class FacilityService {
	async getAllFacilities(): Promise<Facility[]> {
		return await db.select().from(facilities);
	}

	async getFacilityByName(name: string): Promise<Facility | undefined> {
		const result = await db.select().from(facilities).where(eq(facilities.name, name));
		return result[0];
	}

	async getFacilityNamesByCareType(careType: string) {
		const results = await db.select().from(facilityCareTypeMatch).where(eq(facilityCareTypeMatch.careTypeName, careType));
		return results;
	}

	async getAvailableFacilitiesByCareTypeAndUserZipCode(careType: string, userZipCode: number): Promise<FacilityDistance[]> {
		let results = (
			await db
				.select({
					facilityName: facilities.name,
					careTypeName: facilityCareTypeMatch.careTypeName,
					zipCode: facilities.zipCode,
				})
				.from(facilities)
				.innerJoin(facilityCareTypeMatch, eq(facilityCareTypeMatch.facilityName, facilities.name))
				.where(
					and(
						eq(facilityCareTypeMatch.careTypeName, careType),
						eq(facilities.capacityType, "Available"),
						lte(facilities.servesFromZipCode, userZipCode),
						gte(facilities.servesToZipCode, userZipCode)
					)
				)
		).map((result) => new FacilityDistance(result.facilityName, result.careTypeName ?? "", result.zipCode, Math.abs(result.zipCode - userZipCode)));

		return results;
	}
}

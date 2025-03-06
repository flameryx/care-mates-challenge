import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const facilities = pgTable("facilities", {
	name: text("name").primaryKey().notNull(),
	zipCode: integer("zip_code").notNull(),
	servesFromZipCode: integer("serves_from_zip_code").notNull(),
	servesToZipCode: integer("serves_to_zip_code").notNull(),
	capacityType: text("capacity_type")
		.notNull()
		.references(() => capacity.name),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const capacity = pgTable("capacity", {
	name: text("name").primaryKey().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const careTypes = pgTable("care_types", {
	name: text("name").primaryKey().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const facilityCareTypeMatch = pgTable("facility_care_type_match", {
	facilityName: text("facility_name").references(() => facilities.name),
	careTypeName: text("care_type_name").references(() => careTypes.name),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Facility = typeof facilities.$inferSelect;
export type Capacity = typeof capacity.$inferSelect;
export type CareType = typeof careTypes.$inferSelect;
export type FacilityCareTypeMatch = typeof facilityCareTypeMatch.$inferSelect;

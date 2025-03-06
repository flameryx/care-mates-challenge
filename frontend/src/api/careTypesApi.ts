import { apiUrl } from "./api";

export const careTypesApi = {
	getAllCareTypes: getAllCareTypes,
};

async function getAllCareTypes() {
	try {
		const response = await fetch(`${apiUrl}/careTypes`);

		return response;
	} catch (error) {
		console.error("Error fetching care types:", error);
	}
}

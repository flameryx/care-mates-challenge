import { apiUrl } from "../api/api";

const backendFormApi = `${apiUrl}/form`;

export const formApi = {
	validateName: validateName,
	validateCareType: validateCareType,
	searchMatchingFacility: searchMatchingFacility,
};

async function searchMatchingFacility(patientZipCode: string, patientCareType: string) {
	try {
		const response = await fetch(`${backendFormApi}/searchMatchingFacility/${patientZipCode}/${patientCareType}`, {
			method: "POST",
		});

		return response;
	} catch (error) {
		console.error("Error searching matching facility:", error);
	}
}

async function validateName(patientName: string) {
	try {
		const response = await fetch(`${backendFormApi}/validateName/${patientName}`, {
			method: "POST",
		});

		return response;
	} catch (error) {
		console.error("Error validating patient name:", error);
	}
}

async function validateCareType(patientCareType: string) {
	try {
		const response = await fetch(`${backendFormApi}/validateCareType/${patientCareType}`, {
			method: "POST",
		});

		return response;
	} catch (error) {
		console.error("Error validating care type:", error);
	}
}

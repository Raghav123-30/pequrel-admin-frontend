import type { ApiData } from '$lib/models/apiData';
import { BACKEND_URL } from '$env/static/private';

const BASE_URL = BACKEND_URL || '';
export async function getData<T>(url: string): Promise<ApiData<T>> {
	try {
		const response = await fetch(BASE_URL + url, { cache: 'no-cache' });

		if (!response.ok) {
			return {
				error: true,
				message: `HTTP error! status: ${response.status}`
			};
		}

		const result = await response.json();
		const apiData: ApiData<T> = {
			data: result,
			error: false
		};
		return apiData;
	} catch (error) {
		return {
			error: true,
			message: error instanceof Error ? error.message : 'Something went wrong'
		};
	}
}

export async function postData<T>(url: string, body: T): Promise<ApiData<T>> {
	console.log(BASE_URL + url);
	try {
		const response = await fetch(BASE_URL + url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			return {
				error: true,
				message: `HTTP error! status: ${response.status}`
			};
		}

		const result = await response.json();
		const apiData: ApiData<T> = {
			data: result,
			error: false
		};
		return apiData;
	} catch (error) {
		return {
			error: true,
			message: error instanceof Error ? error.message : 'Something went wrong'
		};
	}
}
export async function putData<T>(url: string, body: T): Promise<ApiData<T>> {
	try {
		const response = await fetch(BASE_URL + url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			return {
				error: true,
				message: `HTTP error! status: ${response.status}`
			};
		}

		const result = await response.json();
		const apiData: ApiData<T> = {
			data: result,
			error: false
		};
		return apiData;
	} catch (error) {
		return {
			error: true,
			message: error instanceof Error ? error.message : 'Something went wrong'
		};
	}
}
export async function deleteData<T>(url: string): Promise<ApiData<T>> {
	try {
		const response = await fetch(BASE_URL + url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			return {
				error: true,
				message: `HTTP error! status: ${response.status}`
			};
		}

		const result = await response.json();
		const apiData: ApiData<T> = {
			data: result,
			error: false
		};
		return apiData;
	} catch (error) {
		return {
			error: true,
			message: error instanceof Error ? error.message : 'Something went wrong'
		};
	}
}

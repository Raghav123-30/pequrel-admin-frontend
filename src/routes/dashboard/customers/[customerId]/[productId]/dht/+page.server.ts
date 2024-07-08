import { getTodayDateRange } from '$lib/components/utils/getTodayDateRange.js';
import type { Dht } from '$lib/models/dht';
import { getData } from '$lib/server/utils/DataService';

export const load = async ({ params }) => {
	const productId = params.productId;
	const customerId = params.customerId;
	const [start, end] = getTodayDateRange();
	const dhtResponse = await getData<Dht[]>(
		`/api/dht/query?customerId=${customerId}&productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`
	);
	console.log(dhtResponse);
	if (dhtResponse.error) {
		return {
			error: true,
			dhtData: [] as Dht[]
		};
	} else {
		return {
			error: false,
			dhtData: dhtResponse.data as Dht[]
		};
	}
};

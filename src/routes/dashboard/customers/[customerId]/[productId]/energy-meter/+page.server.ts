import { getTodayDateRange } from '$lib/components/utils/getTodayDateRange.js';
import type { EnergyMeter } from '$lib/models/energyMeter';
import { getData } from '$lib/server/utils/DataService';

export const load = async ({ params }) => {
	const productId = params.productId;
	const customerId = params.customerId;
	const [start, end] = getTodayDateRange();
	const energyMeterResponse = await getData<EnergyMeter[]>(
		`/api/energy-meter/query?customerId=${customerId}&productId=${productId}&start=${start.toISOString()}&end=${end.toISOString()}`
	);
	console.log(energyMeterResponse);
	if (energyMeterResponse.error) {
		return {
			error: true,
			energyMeterData: [] as EnergyMeter[]
		};
	} else {
		return {
			error: false,
			energyMeterData: energyMeterResponse.data as EnergyMeter[]
		};
	}
};

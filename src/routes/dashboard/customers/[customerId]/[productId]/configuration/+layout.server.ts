import type { Configuration } from '$lib/models/configuration.js';
import { getData } from '$lib/server/utils/DataService.js';

export const load = async ({ params }) => {
	const customerId = params.customerId;
	const productId = params.productId;
	const configurationData = await getData<Configuration>(
		`/api/customers/configuration?customerId=${customerId}&productId=${productId}`
	);
	if (configurationData.error) {
		return {
			error: true,
			configuration: {} as Configuration
		};
	} else {
		return {
			error: false,
			configuration: configurationData.data as Configuration
		};
	}
};

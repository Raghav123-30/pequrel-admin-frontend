import { getData } from '$lib/server/utils/DataService.js';
import type { Product } from '$lib/models/product.js';
import type { Customer } from '$lib/models/customer.js';
import type { Crop } from '$lib/models/crop.js';

export const load = async ({ params }) => {
	const productsData = await getData<Product[]>(`/api/products`);
	const cropssData = await getData<Crop[]>(`/api/crops`);
	const customerData = await getData<Customer>(`/api/customers/${params.customerId}`);

	if (productsData.error || customerData.error || cropssData.error) {
		return {
			error: true,
			productsData: [] as Product[],
			cropssData: [] as Crop[],
			customerData: {} as Customer
		};
	} else {
		return {
			error: false,
			productsData: productsData.data || ([] as Product[]),
			cropssData: cropssData.data || ([] as Crop[]),
			customerData: customerData.data || ({} as Customer)
		};
	}
};

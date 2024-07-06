import { getData } from '$lib/server/utils/DataService.js';
import type { Product } from '$lib/models/product.js';
import type { Customer } from '$lib/models/customer.js';

export const load = async ({ params }) => {
	const productsData = await getData<Product[]>(`/api/products`);
	const customerData = await getData<Customer>(`/api/customers/${params.customerId}`);
	if (productsData.error || customerData.error) {
		return {
			error: true,
			productsData: [] as Product[],
			customerData: {} as Customer
		};
	} else {
		return {
			error: false,
			productsData: productsData.data || ([] as Product[]),
			customerData: customerData.data || ({} as Customer)
		};
	}
};

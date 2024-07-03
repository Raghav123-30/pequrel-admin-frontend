import type { PageServerLoad } from './$types';
import { getData } from '$lib/server/utils/DataService';
import type { Product } from '$lib/models/product';

export const load: PageServerLoad = async () => {
	const productsData = await getData<Product[]>('/api/products');

	if (productsData.error) {
		return {
			error: true,
			products: [] as Product[]
		};
	} else {
		return {
			error: false,
			products: productsData.data || ([] as Product[])
		};
	}
};

import type { PageServerLoad } from './$types';
import { getData } from '$lib/server/utils/DataService';

export const load: PageServerLoad = async ({ params }) => {
	const productResult = await getData(`/api/products/${params.id}`);
	console.log(productResult);
};

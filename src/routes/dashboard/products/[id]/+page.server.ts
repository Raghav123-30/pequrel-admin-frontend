import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	//const productResult = await getData(`/api/products/${params.id}`);
	return {
		data: 'hello'
	};
};

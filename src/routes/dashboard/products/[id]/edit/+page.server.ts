import { productSchema } from '$lib/schemas/productSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Product } from '$lib/models/product.js';

export const load = async ({ params, cookies }) => {
	const form = await superValidate(zod(productSchema));
	const result = await getData<Product>(`/api/products/${params.id}`);
	const productData = result.data;
	cookies.set('productName', productData?.productName || '', { httpOnly: true, path: '/' });
	return {
		productData,
		form
	};
};

export const actions: Actions = {
	default: async ({ request, params, cookies }) => {
		const form = await superValidate(request, zod(productSchema));
		const productData = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allProductsResponse = await getData<Product[]>('/api/products');
			if (allProductsResponse.error) {
				return message(form, 'Could not update your product. Please try again later', {
					status: 403
				});
			} else {
				const previousProductName = cookies.get('productName');

				const filteredProducts = allProductsResponse.data?.filter(
					(product) =>
						product.productName.trim().toLowerCase() !== previousProductName?.trim().toLowerCase()
				);

				if (
					filteredProducts?.find(
						(product) =>
							product.productName.trim().toLowerCase() ===
							form.data.productName.trim().toLowerCase()
					)
				) {
					return message(form, 'Product with that name already exists', {
						status: 403
					});
				} else {
					const response = await putData(`/api/products/${params.id}`, {
						...productData,
						productId: params.id
					});
					if (!response.error) {
						throw redirect(300, '/dashboard/products');
					} else {
						return message(form, 'Could not update your product. Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

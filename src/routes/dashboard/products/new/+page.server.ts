import { productSchema } from '$lib/schemas/productSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, postData } from '$lib/server/utils/DataService';
import type { Product } from '$lib/models/product';

export const load = async () => {
	const form = await superValidate(zod(productSchema));

	return {
		form: form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(productSchema));
		const productData = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allProductsResponse = await getData<Product[]>('/api/products');

			if (allProductsResponse.error) {
				return message(form, 'Could not submit your product.Please try again later', {
					status: 403
				});
			} else {
				const allProducts = allProductsResponse.data;
				if (
					allProducts?.find(
						(product) =>
							product.productName.trim().toLowerCase() ===
							form.data.productName.trim().toLowerCase()
					)
				) {
					return message(form, 'Product with that name already exists', {
						status: 403
					});
				} else {
					const respose = await postData('/api/products', productData);
					if (!respose.error) {
						throw redirect(300, '/dashboard/products');
					} else {
						return message(form, 'Could not submit your product.Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

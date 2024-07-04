import { productSchema } from '$lib/schemas/productSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Product } from '$lib/models/product.js';

export const load = async ({ params }) => {
	const form = await superValidate(zod(productSchema));
	const result = await getData<Product>(`/api/products/${params.id}`);

	return {
		productData: result.data,
		form: form
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(productSchema));
		const productData = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const respose = await putData(`/api/products/${params.id}`, {
				...productData,
				productId: params.id
			});
			if (!respose.error) {
				throw redirect(300, '/dashboard/products');
			} else {
				return message(form, 'Could not update your product.Please try again later', {
					status: 403
				});
			}
		}
	}
};

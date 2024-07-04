import { productSchema } from '$lib/schemas/productSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { postData } from '$lib/server/utils/DataService';

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
			const respose = await postData('/api/products', productData);
			if (!respose.error) {
				throw redirect(300, '/dashboard/products');
			} else {
				return message(form, 'Could not submit your crop.Please try again later', {
					status: 403
				});
			}
		}
	}
};

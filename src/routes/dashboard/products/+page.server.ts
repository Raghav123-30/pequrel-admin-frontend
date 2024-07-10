import type { PageServerLoad } from './$types';
import { getData } from '$lib/server/utils/DataService';
import type { Product } from '$lib/models/product';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Customer } from '$lib/models/customer';

const productIdSchema = z.object({
	productId: z.string().min(1, { message: 'Provide valid product ID please' })
});

export const load: PageServerLoad = async () => {
	const productsData = await getData<Product[]>('/api/products');
	const form = await superValidate(zod(productIdSchema));
	if (productsData.error) {
		return {
			form: form,
			error: true,
			products: [] as Product[]
		};
	} else {
		return {
			form: form,
			error: false,
			products: productsData.data || ([] as Product[])
		};
	}
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(productIdSchema));
		const { productId } = form.data;
		if (!form.valid) {
			return fail(400, { form });
		} else {
			//const deleteResult = await deleteData<Product>(`/api/products/${productId}`);
			const deleteResult = await fetch(`${PUBLIC_BACKEND_URL}/api/products/${productId}`, {
				method: 'DELETE'
			});
			console.log(deleteResult);

			if (!deleteResult.ok) {
				if (deleteResult.status === 409) {
					const customersUsingProduct = (await deleteResult.json()) as Customer[];
					const customerNames = customersUsingProduct.map((customer) => customer.customerName);

					return message(
						form,
						`Cannot delete this product as the following customer/s are using this product.
					  
					  ${customerNames.join(', ')}
					  
					  `,
						{
							status: 403
						}
					);
				} else {
					return message(form, 'Could not delete your product.Please try again later', {
						status: 403
					});
				}
			} else {
				return message(form, 'Deleted product successfully');
			}
		}
	}
};

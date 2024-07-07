import type { PageServerLoad } from './$types';
import { getData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer';
import { BACKEND_URL } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Product } from '$lib/models/product';

const customerIdSchema = z.object({
	customerId: z.string().min(1, { message: 'Provide valid customer ID please' })
});

export const load: PageServerLoad = async () => {
	const customersData = await getData<Customer[]>('/api/customers');
	const productsData = await getData<Product[]>('/api/products');
	const form = await superValidate(zod(customerIdSchema));
	if (customersData.error || productsData.error) {
		return {
			form: form,
			error: true,
			customers: [] as Customer[],
			products: [] as Product[]
		};
	} else {
		return {
			form: form,
			error: false,
			customers: customersData.data || ([] as Customer[]),
			products: productsData.data || ([] as Product[])
		};
	}
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(customerIdSchema));
		const { customerId } = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			if (form.data.customerId === '66880ed2789fbf22180ab081') {
				return message(
					form,
					'Raghavendra and Raghuttam are using this record for API building and testing. You cannot delete it',
					{
						status: 403
					}
				);
			} else {
				const deleteResult = await fetch(`${BACKEND_URL}/api/customers/${customerId}`, {
					method: 'DELETE'
				});

				if (!deleteResult.ok) {
					return message(form, 'Could not delete customer data.Please try again later', {
						status: 403
					});
				} else {
					return message(form, 'Deleted customer data successfully');
				}
			}
		}
	}
};

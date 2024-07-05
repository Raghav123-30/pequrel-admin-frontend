import type { PageServerLoad } from './$types';
import { getData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer';
import { BACKEND_URL } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const customerIdSchema = z.object({
	customerId: z.string().min(1, { message: 'Provide valid customer ID please' })
});

export const load: PageServerLoad = async () => {
	const customersData = await getData<Customer[]>('/api/customers');
	const form = await superValidate(zod(customerIdSchema));
	if (customersData.error) {
		return {
			form: form,
			error: true,
			customers: [] as Customer[]
		};
	} else {
		return {
			form: form,
			error: false,
			customers: customersData.data || ([] as Customer[])
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
			//const deleteResult = await deleteData<customer>(`/api/customers/${customerId}`);
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
};

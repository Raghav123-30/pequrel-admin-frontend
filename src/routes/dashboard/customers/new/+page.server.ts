import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { CustomerSchema } from '$lib/schemas/customerSchema';
import { postData, getData } from '$lib/server/utils/DataService';
import type { Actions } from '@sveltejs/kit';
import { fail, message } from 'sveltekit-superforms';
import type { Customer } from '$lib/models/customer';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(CustomerSchema));

	return {
		form: form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(CustomerSchema));
		const customerData = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allcustomersResponse = await getData<Customer[]>('/api/customers');

			if (allcustomersResponse.error) {
				return message(form, 'Could not submit your customer data.Please try again later', {
					status: 403
				});
			} else {
				const allcustomers = allcustomersResponse.data;
				if (
					allcustomers?.find(
						(customer) =>
							customer.customerEmail.trim().toLowerCase() ===
							form.data.customerEmail.trim().toLowerCase()
					)
				) {
					return message(form, 'customer with that email already exists', {
						status: 403
					});
				} else {
					const respose = await postData('/api/customers', customerData);
					if (!respose.error) {
						throw redirect(300, '/dashboard/customers');
					} else {
						return message(form, 'Could not submit your customer.Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

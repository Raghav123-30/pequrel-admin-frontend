import { CustomerSchema } from '$lib/schemas/customerSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer.js';

export const load = async ({ params, cookies }) => {
	const form = await superValidate(zod(CustomerSchema));
	const result = await getData<Customer>(`/api/customers/${params.customerId}`);
	const customerData = result.data;
	cookies.set('customerEmail', customerData?.customerEmail || '', { httpOnly: true, path: '/' });
	return {
		customerData,
		form
	};
};

export const actions: Actions = {
	default: async ({ request, params, cookies }) => {
		const form = await superValidate(request, zod(CustomerSchema));
		const customerData = form.data;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allcustomersResponse = await getData<Customer[]>('/api/customers');

			if (allcustomersResponse.error) {
				return message(form, 'Could not update your customer. Please try again later', {
					status: 403
				});
			} else {
				const previousCustomerEmail = cookies.get('customerEmail');

				const filteredcustomers = allcustomersResponse.data?.filter(
					(customer) =>
						customer.customerEmail.trim().toLowerCase() !==
						previousCustomerEmail?.trim().toLowerCase()
				);

				if (
					filteredcustomers?.find(
						(customer) =>
							customer.customerEmail.trim().toLowerCase() ===
							form.data.customerEmail.trim().toLowerCase()
					)
				) {
					return message(form, 'customer with that email already exists', {
						status: 403
					});
				} else {
					const response = await putData(`/api/customers/${params.customerId}`, {
						...customerData,
						customerId: params.customerId
					});
					console.log(response);
					if (!response.error) {
						throw redirect(300, '/dashboard/customers');
					} else {
						return message(form, 'Could not update your customer data. Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

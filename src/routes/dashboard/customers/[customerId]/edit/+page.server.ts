import { customerSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer.js';

export const load = async ({ params, cookies }) => {
	const form = await superValidate(zod(customerSchema));
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
		const form = await superValidate(request, zod(customerSchema));
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
					const currentCustomerData = allcustomersResponse.data?.find(
						(customer) => customer.customerId == params.customerId
					);

					const response = await putData(`/api/customers/${params.customerId}`, {
						...customerData,
						customerId: params.customerId,
						cropIds: currentCustomerData?.cropIds,
						productIds: currentCustomerData?.productIds,
						setupConfigurations: currentCustomerData?.setupConfigurations
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

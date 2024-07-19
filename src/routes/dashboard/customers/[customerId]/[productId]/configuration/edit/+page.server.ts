import { configurationSchema } from '$lib/schemas/configurationSchema';

import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from 'sveltekit-superforms';
import { getData, postData, putData } from '$lib/server/utils/DataService.js';
import type { Customer } from '$lib/models/customer.js';
import type { Notification } from '$lib/models/notification.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(configurationSchema));
	return { form };
};

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(configurationSchema));
		const configuration = form.data;
		const customerId = params.customerId;
		const productId = params.productId;

		if (!form.valid) {
			return fail(400, { form });
		} else {
			const customerResponse = await getData<Customer>(`/api/customers/${customerId}`);

			if (customerResponse.error) {
				return message(form, 'Could not update configuration.Please try again later', {
					status: 403
				});
			} else {
				const customer = customerResponse.data!;
				customer.setupConfigurations = customer.setupConfigurations?.map((config) => {
					if (config.productId === productId) {
						config.configuration = configuration;
					}
					return config;
				});

				const notification: Notification = {
					modifiedBy: 'Customer',
					message: 'Admin has updated the configuration',
					modifiedAt: new Date(),
					productId: productId,
					customerId: customerId
				};
				await postData<Notification>('/api/notifications', notification);
				const respose = await putData(`/api/customers/${customerId}`, customer);
				if (!respose.error) {
					throw redirect(300, `/dashboard/customers/${customerId}/${productId}/configuration`);
				} else {
					return message(form, 'Could not submit your product.Please try again later', {
						status: 403
					});
				}
			}
		}
	}
};

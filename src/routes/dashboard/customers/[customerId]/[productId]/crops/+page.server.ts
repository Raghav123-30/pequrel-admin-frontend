import type { Customer } from '$lib/models/customer.js';
import { cropIdSchema } from '$lib/schemas';
import { getData, putData } from '$lib/server/utils/DataService.js';
import { redirect } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const cropIdform = await superValidate(zod(cropIdSchema));
	return { cropIdform };
};

export const actions = {
	addCrop: async ({ request, params }) => {
		console.log('request reached here');
		const customerId = params.customerId;
		const productId = params.productId;
		console.log(request);
		const form = await superValidate(request, zod(cropIdSchema));
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const customerResponse = await getData<Customer>(`/api/customers/${customerId}`);
			if (customerResponse.error) {
				return message(form, 'Could not add new crop.Try again later', { status: 403 });
			} else {
				const customerData = customerResponse.data;
				customerData?.setupCrops?.push({
					productId: productId,
					cropId: form.data.cropId
				});
				const updatedCustomerResponse = await putData(
					`/api/customers/${customerData?.customerId}`,
					customerData
				);
				if (updatedCustomerResponse.error) {
					return message(form, 'Could not add new crop.Try again later', { status: 403 });
				} else {
					throw redirect(303, `/dashboard/customers/${customerId}/${productId}/crops`);
				}
			}
		}
	},
	deleteCrop: async ({ request, params }) => {
		console.log('request reached here');
		const customerId = params.customerId;
		const productId = params.productId;
		console.log(request);
		const form = await superValidate(request, zod(cropIdSchema));
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const customerResponse = await getData<Customer>(`/api/customers/${customerId}`);
			if (customerResponse.error) {
				return message(form, 'Could not delete crop.Try again later', { status: 403 });
			} else {
				const customerData = customerResponse.data;
				customerData!.setupCrops = customerData?.setupCrops?.filter(
					(item) => item.productId !== productId || item.cropId !== form.data.cropId
				);
				const updatedCustomerResponse = await putData(
					`/api/customers/${customerData?.customerId}`,
					customerData
				);
				if (updatedCustomerResponse.error) {
					return message(form, 'Could not add delete crop.Try again later', { status: 403 });
				} else {
					throw redirect(303, `/dashboard/customers/${customerId}/${productId}/crops`);
				}
			}
		}
	}
};

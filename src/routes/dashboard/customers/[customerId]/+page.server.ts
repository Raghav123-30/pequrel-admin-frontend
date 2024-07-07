import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer';
import { message } from 'sveltekit-superforms';

const productIdSchema = z.object({
	productId: z.string().min(1, { message: 'Valid product ID is required' })
});

export const load = async () => {
	const form = await superValidate(zod(productIdSchema));

	return {
		form: form
	};
};

export const actions: Actions = {
	addProduct: async ({ request, params }) => {
		const form = await superValidate(request, zod(productIdSchema));
		const customerResult = await getData<Customer>(`/api/customers/${params.customerId}`);
		console.log(customerResult);
		if (!customerResult.error) {
			const customerData = customerResult.data;
			customerData?.productIds?.push(form.data.productId);
			const updatedCustomerResult = await putData(
				`/api/customers/${params.customerId}`,
				customerData
			);
			if (updatedCustomerResult.error) {
				return message(form, `Could not add new product to customer please try again later`, {
					status: 403
				});
			} else {
				return message(
					form,
					`New product is added for ${customerData?.customerName} successfully `
				);
			}
		} else {
			return message(form, `Could not add new product to customer please try again later`, {
				status: 403
			});
		}
	},
	deleteProduct: async ({ request, params }) => {
		const form = await superValidate(request, zod(productIdSchema));
		const customerResult = await getData<Customer>(`/api/customers/${params.customerId}`);
		console.log(customerResult);
		if (!customerResult.error) {
			const customerData = customerResult.data;
			if (customerData?.customerId == '66880ed2789fbf22180ab081') {
				return message(form, `This record is in use for api development and testing`, {
					status: 403
				});
			} else {
				customerData!.productIds = customerData?.productIds?.filter(
					(productId) => productId != form.data.productId
				);
				console.log(customerData?.productIds);
				console.log(form.data.productId);
				const updatedCustomerResult = await putData(
					`/api/customers/${params.customerId}`,
					customerData
				);
				if (updatedCustomerResult.error) {
					return message(
						form,
						`Could not delete this product from customer. Please try again later`,
						{
							status: 403
						}
					);
				} else {
					return message(
						form,
						`This product is deleted from ${customerData?.customerName} successfully `
					);
				}
			}
		} else {
			return message(form, `Could not delete this product from customer. Please try again later`, {
				status: 403
			});
		}
	}
};

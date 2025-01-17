import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { getData, putData } from '$lib/server/utils/DataService';
import type { Customer } from '$lib/models/customer';
import { message } from 'sveltekit-superforms';
import type { Configuration } from '$lib/models/configuration';
import { customerProductSchema } from '$lib/schemas/customerProductSchema';

const productIdSchema = z.object({
	productId: z.string().min(1, { message: 'Valid product ID is required' })
});

export const load = async () => {
	const form = await superValidate(zod(productIdSchema));
	const customerProductForm = await superValidate(zod(customerProductSchema));
	return {
		form: form,
		customerProductForm: customerProductForm
	};
};

export const actions: Actions = {
	addProduct: async ({ request, params }) => {
		const form = await superValidate(request, zod(customerProductSchema));
		const customerResult = await getData<Customer>(`/api/customers/${params.customerId}`);
		console.log(customerResult);
		if (!customerResult.error) {
			const customerData = customerResult.data;

			customerData?.customerProducts.push({ ...form.data });
			customerData?.setupConfigurations?.push({
				productId: form.data.productId,
				configuration: {} as Configuration
			});
			const updatedCustomerResult = await putData(
				`/api/customers/${params.customerId}`,
				customerData
			);
			if (updatedCustomerResult.error) {
				return message(form, `Could not add new product to customer please try again later`, {
					status: 403
				});
			} else {
				throw redirect(300, `/dashboard/customers/${params.customerId}`);
			}
		} else {
			return message(form, `Could not add new product to customer please try again later`, {
				status: 403
			});
		}
	},
	deleteProduct: async ({ request, params }) => {
		console.log('Request reached here');
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
				customerData!.customerProducts = customerData!.customerProducts!.filter(
					(customerProduct) => customerProduct.productId != form.data.productId
				);
				customerData!.setupConfigurations = customerData!.setupConfigurations?.filter(
					(item) => item.productId != form.data.productId
				);

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
					throw redirect(300, `/dashboard/customers/${params.customerId}`);
				}
			}
		} else {
			return message(form, `Could not delete this product from customer. Please try again later`, {
				status: 403
			});
		}
	}
};

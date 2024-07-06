import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';

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
	addProduct: async ({ request }) => {
		const form = await superValidate(request, zod(productIdSchema));
		console.log('Request reached here bro');
		console.log(form);
		return { form };
	},
	deleteProduct: async ({ request }) => {
		const form = await superValidate(request, zod(productIdSchema));
		console.log('Request reached here bro');
		console.log(form);
		return { form };
	}
};

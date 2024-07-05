import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { CustomerSchema } from '$lib/schemas/customerSchema';
export const load = async () => {
	const form = await superValidate(zod(CustomerSchema));

	return {
		form: form
	};
};

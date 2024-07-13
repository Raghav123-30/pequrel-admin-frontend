import { cropSchema } from '$lib/schemas/cropSchema';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { getData } from '$lib/server/utils/DataService';
import type { Crop } from '$lib/models/crop';

export const load = async () => {
	const form = await superValidate(zod(cropSchema));
	const cropsResponse = await getData<Crop[]>('/api/crops');

	if (cropsResponse.error) {
		return {
			error: false,
			form: form,
			crops: [] as Crop[]
		};
	} else {
		return {
			error: false,
			form: form,
			crops: cropsResponse.data! as Crop[]
		};
	}
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(cropSchema));
		console.log(form);
		return { form };
	}
};

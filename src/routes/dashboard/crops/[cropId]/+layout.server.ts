import type { Crop } from '$lib/models/crop.js';
import { cropSchema } from '$lib/schemas/cropSchema.js';
import { getData } from '$lib/server/utils/DataService.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }) => {
	const cropId = params.cropId;
	const cropResponse = await getData<Crop>(`/api/crops/${cropId}`);
	const form = await superValidate(zod(cropSchema));

	if (cropResponse.error) {
		return {
			error: true,
			crop: {} as Crop,
			form: form
		};
	} else {
		return {
			error: false,
			crop: cropResponse.data!,
			form: form
		};
	}
};

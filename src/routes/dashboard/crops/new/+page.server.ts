import { cropSchema } from '$lib/schemas/cropSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { getData, postData } from '$lib/server/utils/DataService';
import type { Crop } from '$lib/models/crop';

export const load = async () => {
	const form = await superValidate(zod(cropSchema));

	return {
		form: form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(cropSchema));
		const cropData = form.data;
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allCropsResponse = await getData<Crop[]>('/api/crops');

			if (allCropsResponse.error) {
				return message(form, 'Could not submit your crop.Please try again later', {
					status: 403
				});
			} else {
				const allCrops = allCropsResponse.data;
				if (
					allCrops?.find(
						(crop) =>
							crop.cropNameEnglish.trim().toLowerCase() ===
							form.data.cropNameEnglish.trim().toLowerCase()
					)
				) {
					return message(form, 'Crop with that name already exists', {
						status: 403
					});
				} else {
					const respose = await postData('/api/crops', cropData);
					if (!respose.error) {
						throw redirect(300, '/dashboard/crops');
					} else {
						return message(form, 'Could not submit your crop.Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

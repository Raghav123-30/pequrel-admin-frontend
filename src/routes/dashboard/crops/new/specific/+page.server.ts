import { cropSchema } from '$lib/schemas/cropSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { getData, postData } from '$lib/server/utils/DataService';
import type { Crop } from '$lib/models/crop';
import { fail, redirect, type Actions } from '@sveltejs/kit';

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
								form.data.cropNameEnglish.trim().toLowerCase() &&
							crop.city == form.data.city &&
							crop.mode == form.data.mode
					)
				) {
					console.log('Its failing here');
					return message(
						form,
						`Specific Crop with name ${form.data.cropNameEnglish} already exists in ${form.data.city}`,
						{
							status: 403
						}
					);
				} else {
					const respose = await postData<Crop>('/api/crops', {
						...cropData,
						configuration: cropData
					});
					console.log(respose);
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

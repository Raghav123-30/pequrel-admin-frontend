import type { CropCategory } from '$lib/models/cropCategory.js';
import { cropCategorySchema } from '$lib/schemas';
import { getData, postData } from '$lib/server/utils/DataService.js';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
export const load = async () => {
	const form = await superValidate(zod(cropCategorySchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(cropCategorySchema));
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allCropCategoriesResponse = await getData<CropCategory[]>('/api/crop-categories');
			if (allCropCategoriesResponse.error) {
				return message(form, 'Could not submit your crop category.Please try again later', {
					status: 403
				});
			} else {
				const allCropCategories = allCropCategoriesResponse.data;
				if (
					allCropCategories?.find(
						(cropCategory) =>
							cropCategory.cropCategoryNameEnglish.trim().toLowerCase() ===
							form.data.cropCategoryNameEnglish
					)
				) {
					return message(form, 'Crop category with that name already exists', { status: 403 });
				} else {
					const response = await postData('/api/crop-categories', form.data);
					if (!response.error) {
						throw redirect(300, '/dashboard/crops');
					} else {
						return message(form, 'Could not submit your crop category.Please try again later', {
							status: 403
						});
					}
				}
			}
		}
	}
};

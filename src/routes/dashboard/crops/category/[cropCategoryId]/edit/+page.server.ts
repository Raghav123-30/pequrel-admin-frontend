import type { CropCategory } from '$lib/models/cropCategory.js';
import { cropCategorySchema } from '$lib/schemas/cropCategorySchema.js';
import { getData, putData } from '$lib/server/utils/DataService.js';
import { message, fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

// export const load = async () => {
// 	const cropCategoriesResponse = await getData<CropCategory[]>('/api/crop-categories');
// 	if (cropCategoriesResponse.error) {
// 		return {
// 			error: true,

// 			cropCategories: [] as CropCategory[]
// 		};
// 	} else {
// 		return {
// 			error: false,

// 			cropCategories: cropCategoriesResponse.data! as CropCategory[]
// 		};
// 	}
// };

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(cropCategorySchema));
		console.log('request has reached here');
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const allCropCategoriesResponse = await getData<CropCategory[]>('/api/crop-categories');
			if (allCropCategoriesResponse.error) {
				return message(form, 'Could not update your crop category. Please try again later', {
					status: 403
				});
			} else {
				const allCropCategories = allCropCategoriesResponse.data;
				const existingCropCategoryResponse = await getData<CropCategory>(
					`/api/crop-categories/${params.cropCategoryId}`
				);
				if (existingCropCategoryResponse.error) {
					return message(form, 'Could not update your crop category. Please try again later', {
						status: 403
					});
				} else {
					const previousCropCategoryName =
						existingCropCategoryResponse.data?.cropCategoryNameEnglish;
					const filteredCategories = allCropCategories?.filter(
						(item) =>
							item.cropCategoryNameEnglish.trim().toLowerCase() !=
							previousCropCategoryName?.trim().toLowerCase()
					);

					if (
						filteredCategories?.find(
							(item) =>
								item.cropCategoryNameEnglish.trim().toLowerCase() ===
								form.data.cropCategoryNameEnglish.trim().toLowerCase()
						)
					) {
						return message(form, 'Crop category with that name already exists', {
							status: 403
						});
					} else {
						const cropCategoryUpdateResponse = await putData(
							`/api/crop-categories/${params.cropCategoryId}`,
							{
								...form.data,
								cropCategoryId: params.cropCategoryId
							}
						);

						if (!cropCategoryUpdateResponse.error) {
							throw redirect(300, '/dashboard/crops');
						} else {
							return message(
								form,
								'Could not update your crop category data. Please try again later',
								{
									status: 403
								}
							);
						}
					}
				}
			}
		}
	}
};

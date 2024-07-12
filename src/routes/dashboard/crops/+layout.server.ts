import type { Crop } from '$lib/models/crop';

import { getData } from '$lib/server/utils/DataService';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { cropCategorySchema } from '$lib/schemas';
import type { CropCategory } from '$lib/models/cropCategory';

export const load = async () => {
	const cropsResponse = await getData<Crop[]>('/api/crops');
	const categoryForm = await superValidate(zod(cropCategorySchema));
	const cropCategoriesResponse = await getData<CropCategory[]>('/api/crop-categories');

	if (cropsResponse.error) {
		return {
			cropCategories: [] as CropCategory[],
			categoryForm: categoryForm,
			error: true,
			allCrops: [] as Crop[]
		};
	} else {
		return {
			cropCategories: cropCategoriesResponse.data as CropCategory[],
			categoryForm: categoryForm,
			error: false,
			allCrops: cropsResponse.data as Crop[]
		};
	}
};

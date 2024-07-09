import type { Crop } from '$lib/models/crop';
import type { CropCategory } from '$lib/models/cropCategory';
import { getData } from '$lib/server/utils/DataService';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { cropCategorySchema } from '$lib/schemas';

export const load = async () => {
	const cropCategoriesResponse = await getData<CropCategory[]>('/api/crop-categories');
	const cropsResponse = await getData<Crop[]>('/api/crops');
	const categoryForm = await superValidate(zod(cropCategorySchema));

	if (cropCategoriesResponse.error || cropsResponse.error) {
		return {
			categoryForm: categoryForm,
			error: true,
			allCrops: [] as Crop[],
			allCropCategories: [] as CropCategory[]
		};
	} else {
		return {
			categoryForm: categoryForm,
			error: false,
			allCrops: cropsResponse.data as Crop[],
			allCropCategories: cropCategoriesResponse.data as CropCategory[]
		};
	}
};

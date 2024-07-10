import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { cropCategoryIdSchema } from '$lib/schemas/cropCategoryIdSchema.js';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

import type { Crop } from '$lib/models/crop.js';

export const load = async () => {
	const cropCategoryIdForm = await superValidate(zod(cropCategoryIdSchema));
	return { cropCategoryIdForm };
};

export const actions = {
	deleteCropCategory: async ({ request }) => {
		console.log('request reached here');

		const form = await superValidate(request, zod(cropCategoryIdSchema));

		if (!form.valid) {
			return fail(400, { form });
		} else {
			//const deleteResult = await deleteData<Product>(`/api/products/${productId}`);
			const deleteResult = await fetch(
				`${PUBLIC_BACKEND_URL}/api/crop-categories/${form.data.cropCategoryId}`,
				{
					method: 'DELETE'
				}
			);
			console.log(deleteResult);

			if (!deleteResult.ok) {
				if (deleteResult.status === 409) {
					const cropsUsingCropCategoryId = (await deleteResult.json()) as Crop[];
					const cropNames = cropsUsingCropCategoryId.map((crop) => crop.cropNameEnglish);

					return message(
						form,
						`Cannot delete this crop category as the following crops are using this as crop category.
					  
					  ${cropNames.join(', ')}
					  
					  `,
						{
							status: 403
						}
					);
				} else {
					return message(form, 'Could not delete your crop category.Please try again later', {
						status: 403
					});
				}
			} else {
				return message(form, 'Deleted crop category successfully');
			}
		}
	},
	deleteDefaultCrop: async () => {},
	deleteSpecificCrop: async () => {}
};

import { cropSchema } from '$lib/schemas/cropSchema.js';
import { putData } from '$lib/server/utils/DataService.js';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async ({ request, params }) => {
		console.log('Request reached here');
		const cropId = params.cropId;
		const form = await superValidate(request, zod(cropSchema));
		console.log(form);
		if (!form.valid) {
			return fail(400, { form });
		} else {
			const cropUpdateResponse = await putData(`/api/crops/${cropId}`, {
				...form.data,
				cropId: cropId,
				configuration: form.data
			});

			console.log(cropUpdateResponse);
			if (cropUpdateResponse.error) {
				return message(form, 'Could not update your crop category. Please try again later', {
					status: 403
				});
			} else {
				throw redirect(303, '/dashboard/crops');
			}
		}
	}
};

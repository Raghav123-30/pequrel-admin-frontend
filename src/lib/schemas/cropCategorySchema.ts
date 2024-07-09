import { z } from 'zod';

export const cropCategorySchema = z.object({
	cropCategoryNameEnglish: z
		.string()
		.min(2, { message: 'Please provide a valid crop category name' }),
	cropCategoryNameKannada: z
		.string()
		.min(2, { message: 'Please provide a valid crop category name' }),
	cropCategoryNameHindi: z.string().min(2, { message: 'Please provide a valid crop category name' })
});

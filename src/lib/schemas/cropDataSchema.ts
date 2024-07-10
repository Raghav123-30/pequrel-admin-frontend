import { z } from 'zod';
export const cropDataSchema = z.object({
	cropCategoryId: z.string().min(1, { message: 'Please select a crop category' }),
	cropNameEnglish: z.string().min(3, { message: 'Enter a valid crop name' }),
	cropNameKannada: z.string().min(3, { message: 'Enter a valid crop name' }),
	cropNameHindi: z.string().min(3, { message: 'Enter a valid crop name' }),
	mode: z.string().min(1, { message: 'Please select a mode' }),
	city: z.string().min(2, 'Please select a city'),
	default: z.boolean(),
	imgUrl: z.string()
});

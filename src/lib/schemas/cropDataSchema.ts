import { z } from 'zod';
export const cropDataSchema = z.object({
	cropNameEnglish: z.string().min(3, { message: 'Enter a valid crop name' }),
	cropNameKannada: z.string().min(3, { message: 'Enter a valid crop name' }),
	cropNameHindi: z.string().min(3, { message: 'Enter a valid crop name' }),
	mode: z.string(),
	city: z.string(),
	cropCategoryName: z.string(),
	specialInstructions: z.string().min(1, {
		message:
			"Provide valid special instruction if crop doesn't need the special instruction fill the field with `0`"
	}),
	specialInstructionsKannada: z.string().min(1, {
		message:
			"Provide valid special instruction if crop doesn't need the special instruction fill the field with `0`"
	}),
	specialInstructionsHindi: z.string().min(1, {
		message:
			"Provide valid special instruction if crop doesn't need the special instruction fill the field with `0`"
	})
});

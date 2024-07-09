import { z } from 'zod';

export const cropCategoryIdSchema = z.object({
	cropCategoryId: z.string().min(1)
});

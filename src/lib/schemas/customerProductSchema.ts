import { z } from 'zod';

export const customerProductSchema = z.object({
	productId: z.string().min(1, { message: 'Please select a product' }),
	setupState: z.string().min(1, { message: 'Please select a setup state' }),
	setupCity: z.string().min(1, { message: 'plese select a setup city' }),
	setupAddress: z.string().min(1, { message: 'Please provide a valid address for the setup' })
});

import { z } from 'zod';

export const customerSchema = z.object({
	customerName: z.string().min(1, { message: 'Customer name is required' }),
	customerEmail: z.string().email({ message: 'Invalid email address' }),
	customerPhone: z
		.string()
		.length(10, { message: 'Customer phone must be exactly 10 characters long' }),
	customerAddress: z.string().min(1, { message: 'Customer address is required' }),
	setupState: z.string().min(1, { message: 'Customer state is required' }),
	setupCity: z.string().min(1, { message: 'Customer city is required' }),
	setupAddress: z.string().min(1, { message: 'Setup address is required' })
});

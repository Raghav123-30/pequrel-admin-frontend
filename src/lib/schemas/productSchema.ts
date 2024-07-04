import { z } from 'zod';

export const productSchema = z.object({
	productName: z.string().min(3, 'Valid product name is required'),
	productArea: z.preprocess(
		Number,
		z.number().min(1, { message: 'Product area must be positive' })
	),
	dryingArea: z.preprocess(Number, z.number().min(1, { message: 'Drying area must be positive' })),
	productType: z.preprocess(Number, z.number().min(0, { message: 'Please choose a product type' })),
	numLayers: z.preprocess(
		Number,
		z.number().min(1, { message: 'Number of layers must be positibe' })
	),
	numTrays: z.preprocess(
		Number,
		z.number().min(1, { message: 'Number of trays must be positive' })
	),
	numRacks: z.preprocess(
		Number,
		z.number().min(1, { message: 'Number of racks must be positive' })
	),
	trayMaterialDescription: z
		.string()
		.min(10, 'Tray material description must be at least 10 characters'),
	productElectronicDescription: z
		.string()
		.min(10, 'Product electronic description must be at least 10 characters')
});

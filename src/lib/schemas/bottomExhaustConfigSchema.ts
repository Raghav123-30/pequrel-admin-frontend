import { z } from 'zod';

export const bottomExhaustConfigSchema = z
	.object({
		bottomHighHumid: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomHighOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomHighOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomMedHumid: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomMedOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomMedOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomLowHumid: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomLowOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		bottomLowOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		)
	})
	.refine(
		(data) =>
			data.bottomHighHumid > data.bottomMedHumid && data.bottomMedHumid > data.bottomLowHumid,
		{
			message: 'Humidity high, med and low should be in descending order',
			path: ['bottomLowHumid']
		}
	);

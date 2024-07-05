import { z } from 'zod';

export const ceilingConfigSchema = z
	.object({
		ceilingHighTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingHighOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingHighOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingMedTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingMedOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingMedOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingLowTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingLowOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		ceilingLowOffFor: z.preprocess(
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
			data.ceilingHighTemp > data.ceilingMedTemp && data.ceilingMedTemp > data.ceilingLowTemp,
		{
			message: 'Temperatures high, med and low should be in descending order',
			path: ['ceilingLowTemp']
		}
	);

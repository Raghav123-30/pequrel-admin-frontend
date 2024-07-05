import { z } from 'zod';

export const heater1ConfigSchema = z
	.object({
		heater1HighTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1HighOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1HighOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1MedTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1MedOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1MedOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1LowTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1LowOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		heater1LowOffFor: z.preprocess(
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
			data.heater1HighTemp > data.heater1MedTemp && data.heater1MedTemp > data.heater1LowTemp,
		{
			message: 'Temperatures high, med and low should be in descending order',
			path: ['heater1LowTemp']
		}
	);

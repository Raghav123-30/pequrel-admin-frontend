import { z } from 'zod';

export const horizontalAirflowConfigSchema = z
	.object({
		horizontalHighTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalHighOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalHighOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalMedTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalMedOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalMedOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalLowTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalLowOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		horizontalLowOffFor: z.preprocess(
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
			data.horizontalHighTemp > data.horizontalMedTemp &&
			data.horizontalMedTemp > data.horizontalLowTemp,
		{
			message: 'Temperatures high, med and low should be in descending order',
			path: ['horizontalLowTemp']
		}
	);

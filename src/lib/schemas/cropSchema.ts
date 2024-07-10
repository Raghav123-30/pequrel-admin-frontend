import { z } from 'zod';

export const cropSchema = z
	.object({
		cropCategoryId: z.string().min(1, { message: 'Please select a crop category' }),
		cropNameEnglish: z.string().min(3, { message: 'Enter a valid crop name' }),
		cropNameKannada: z.string().min(3, { message: 'Enter a valid crop name' }),
		cropNameHindi: z.string().min(3, { message: 'Enter a valid crop name' }),
		mode: z.boolean(),
		city: z.string().min(2, 'Please select a city'),
		default: z.boolean(),
		imgUrl: z.string(),

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
		),
		topHighTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topHighOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topHighOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topMedTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topMedOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topMedOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topLowTemp: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topLowOnFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
		topLowOffFor: z.preprocess(
			Number,
			z
				.number()
				.min(0)
				.max(99)
				.refine((value) => value >= 0 && value <= 99, {
					message: 'Value must be between 0 and 99'
				})
		),
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
		),
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
		),
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
			data.horizontalHighTemp > data.horizontalMedTemp &&
			data.horizontalMedTemp > data.horizontalLowTemp,
		{
			message: 'Temperatures high,med and low should be in descending order',
			path: ['horizontalLowTemp']
		}
	)
	.refine(
		(data) =>
			data.ceilingHighTemp > data.ceilingMedTemp && data.ceilingMedTemp > data.ceilingLowTemp,
		{
			message: 'Temperatures high,med and low should be in descending order',
			path: ['ceilingLowTemp']
		}
	)
	.refine(
		(data) =>
			data.bottomHighHumid > data.bottomMedHumid && data.bottomMedHumid > data.bottomLowHumid,
		{
			message: 'Humidity high,med and low should be in descending order',
			path: ['bottomLowHumid']
		}
	)
	.refine((data) => data.topHighTemp > data.topMedTemp && data.topMedTemp > data.topLowTemp, {
		message: 'Temperatures high,med and low should be in descending order',
		path: ['topLowTemp']
	})
	.refine(
		(data) =>
			data.heater1HighTemp > data.heater1MedTemp && data.heater1MedTemp > data.heater1LowTemp,
		{
			message: 'Temperatures high,med and low should be in descending order',
			path: ['heater1LowTemp']
		}
	);

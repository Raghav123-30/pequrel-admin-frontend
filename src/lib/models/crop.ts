import type { Configuration } from './configuration';

export type Crop = {
	cropId?: string;
	cropCategoryId: string;
	cropNameEnglish: string;
	cropNameKannada: string;
	cropNameHindi: string;
	specialInstructionsEnglish: string;
	specialInstructionsKannada: string;
	specialInstructionsHindi: string;
	isDefault: boolean;
	city: string;
	configuration: Configuration;
};

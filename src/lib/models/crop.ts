import type { Configuration } from './configuration';

export type Crop = {
	cropId?: string;
	cropCategoryId: string;
	cropNameEnglish: string;
	cropNameKannada: string;
	cropNameHindi: string;
	default: boolean;
	city: string;
	mode: string;
	configuration: Configuration;
	imgUrl: string;
};

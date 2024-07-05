export type CropCategory = {
	cropCategoryId?: string;
	cropCategoryNameEnglish: string;
	cropCategoryNameKannada: string;
	cropCategoryNameHindi: string;
	mode: CropCategoryMode;
};

export enum CropCategoryMode {
	Drying = 0,
	Growing = 1
}

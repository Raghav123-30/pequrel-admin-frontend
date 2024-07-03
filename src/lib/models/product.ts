export type Product = {
	productId?: string;
	productName: string;
	productArea: number;
	dryingArea: number;
	productType: number; //drying->0  //drying+growing->1
	numLayers: number;
	numTrays: number;
	numRacks: number;
	productMaterialDescription: string;
	productElectronicDescription: string;
	numCustomers?: number;
};

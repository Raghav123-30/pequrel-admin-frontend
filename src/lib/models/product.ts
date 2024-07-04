export type Product = {
	productId?: string;
	productName: string;
	productArea: number;
	dryingArea: number;
	productType: number; //drying->0  //drying+growing->1
	numLayers: number;
	numTrays: number;
	numRacks: number;
	trayMaterialDescription: string;
	productElectronicDescription: string;
	numCustomers?: number;
};

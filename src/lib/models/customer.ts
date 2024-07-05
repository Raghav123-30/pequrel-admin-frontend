import type { Configuration } from './configuration';

export type Customer = {
	customerId?: string;
	productIds?: string[];
	cropIds?: string[];
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	customerAddress: string;
	setupState: string;
	setupCity: string;
	setupAddress: string;
	configuration?: Configuration;
};

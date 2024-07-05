import type { Configuration } from './configuration';

type SetupConfigurationItem = {
	productId: string;
	configuration: Configuration;
};

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
	setupConfigurations?: SetupConfigurationItem[];
};

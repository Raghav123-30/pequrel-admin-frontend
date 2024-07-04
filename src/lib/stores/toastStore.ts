import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type ToastData = {
	page: 'dashboard' | 'products' | 'customers' | 'crops' | 'operators' | '#';
	show: boolean;
	message: string;
	type: 'success' | 'error';
};

const toastStore: Writable<ToastData> = writable({} as ToastData);

export default toastStore;

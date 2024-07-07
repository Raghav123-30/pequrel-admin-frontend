<script lang="ts">
	import { page } from '$app/stores';
	import IotSection from '$lib/components/iot/IotSection.svelte';

	import type { PageData } from './$types';

	import DisplayCustomerProducts from '$lib/components/customers/DisplayCustomerProducts.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { productIdSchema } from '$lib/schemas/productIdSchema';
	import toastStore from '$lib/stores/toastStore';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	const { productsData, customerData } = data;
	const { form, errors, enhance, message } = superForm(data.form, {
		validators: zod(productIdSchema),
		onResult: async ({ result }) => {}
	});
	message.subscribe((value) => {
		if (value) {
			toastStore.set({
				message: value,
				page: 'products',
				show: true,
				type: 'error'
			});
		}
	});
	onDestroy(() => {
		toastStore.set({
			page: '#',
			show: false,
			message: '',
			type: 'success'
		});
	});
</script>

<SuperDebug data={form} />
<div class="space-y-4 px-8">
	<div>
		<DisplayCustomerProducts {customerData} {productsData} {form} {errors} {enhance} />
	</div>
	<div>
		<IotSection {customerData} {productsData} />
	</div>
</div>

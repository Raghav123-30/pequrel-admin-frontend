<script lang="ts">
	import { page } from '$app/stores';
	import IotSection from '$lib/components/iot/IotSection.svelte';

	import type { PageData } from './$types';

	import DisplayCustomerProducts from '$lib/components/customers/DisplayCustomerProducts.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { productIdSchema } from '$lib/schemas/productIdSchema';

	export let data: PageData;
	const { productsData, customerData } = data;
	const { form, errors, enhance } = superForm(data.form, {
		validators: zod(productIdSchema)
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

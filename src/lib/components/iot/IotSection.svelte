<script lang="ts">
	import { Card, Button, Modal, Select } from 'flowbite-svelte';
	import type { Product } from '$lib/models/product';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	let showModal = false;

	export let productsData: Product[];
	export let customerData;
	let selectedProduct = '';
	const customerProducts = productsData.filter((product) =>
		customerData.productIds?.includes(product.productId!)
	);
	const customerPoductSelectionList = customerProducts.map((customerProduct) => {
		return {
			name: customerProduct.productName,
			value: customerProduct.productId
		};
	});
</script>

<Card class="mx-auto max-w-6xl space-y-4">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">IOT section</h5>

	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
		The IoT section lets you visualize sensor data and energy meter data coming from the customer’s
		setup via graphs and also lets you download them. In addition to that, it lets you view the
		current configuration and notifications regarding the same about configuration updates. It also
		lets you list all the products owned by the customer along with allowing you to add new products
		or remove existing ones. Furthermore, it lets you get the API documentation you need for
		embedded programming.
	</p>

	<Button class="w-fit" on:click={() => (showModal = true)}>Select product</Button>
</Card>

<div class="relative">
	<Modal title="Product selection" bind:open={showModal} size="xs">
		{#if customerProducts.length == 0}
			<div class="flex flex-col items-center justify-center">
				<ExclamationCircleOutline class="h-8 w-8" />
				<p>Mr/Ms {customerData.customerName} has no products yet</p>
			</div>
		{:else}
			<Select items={customerPoductSelectionList} bind:value={selectedProduct} />

			<Button
				disabled={!selectedProduct}
				on:click={() => goto(`/dashboard/customers/${customerData.customerId}/${selectedProduct}`)}
				>Next</Button
			>
			<Button color="alternative" on:click={() => (showModal = false)}>Cancel</Button>
		{/if}
	</Modal>
</div>

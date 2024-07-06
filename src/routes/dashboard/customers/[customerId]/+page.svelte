<script lang="ts">
	import { page } from '$app/stores';
	import IotSection from '$lib/components/iot/IotSection.svelte';
	import { Button, Card, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import DisplayProducts from '$lib/components/products/DisplayProducts.svelte';
	import DisplayCustomerProducts from '$lib/components/customers/DisplayCustomerProducts.svelte';
	export let data: PageData;
	const { productsData } = data;
</script>

<div class="px-8">
	<div class="my-20 flex justify-end">
		<Button color="alternative"
			>Actions<ChevronDownOutline class="ms-2 h-6 w-6 text-black " /></Button
		>
		<Dropdown>
			<DropdownItem>Add product</DropdownItem>
			<DropdownItem>Provision crops</DropdownItem>
		</Dropdown>
	</div>
	<div class="  place-content-start gap-2 space-y-4 px-8">
		<Card class="mx-auto max-w-6xl">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				All the products owned by the customer
			</h5>
			<!-- //<DisplayCustomerProducts customerProducts={productsData} /> //display customers here -->
		</Card>
		<IotSection customerId={$page.params.customerId} />
	</div>
</div>

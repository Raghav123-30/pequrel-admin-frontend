<script lang="ts">
	import type { PageData } from './$types';

	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import DisplayCustomerProducts from '$lib/components/customers/DisplayCustomerProducts.svelte';
	export let data: PageData;

	const { customerData, productsData, error } = data;
</script>

{#if error}
	<DisplayError message="Could not fetch customer and products data.Please try again later" />
{:else}
	<DisplayCustomerProducts customer={customerData} allProducts={productsData} />
{/if}

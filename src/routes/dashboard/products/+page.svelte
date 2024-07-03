<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { products, error } = data;

	import ListProducts from '$lib/components/products/ListProducts.svelte';
</script>

<div>
	{#if error}
		<p>Could not fetch products</p>
	{:else}
		<ListProducts {products} />
	{/if}
</div>

<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { products, error } = data;
	import { Toast } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';

	import ListProducts from '$lib/components/products/ListProducts.svelte';
	import { onDestroy } from 'svelte';
	import toastStore from '$lib/stores/toastStore';
	onDestroy(() => {
		toastStore.set({
			page: '#',
			show: false,
			message: '',
			type: 'success'
		});
	});
</script>

<div>
	{#if error}
		<p>Could not fetch products</p>
	{:else}
		<ListProducts {products} />
	{/if}
</div>

{#if $toastStore.show && $toastStore.page === 'products'}
	<div class="fixed bottom-10 right-10">
		<Toast color="green">
			<svelte:fragment slot="icon">
				<CheckCircleSolid class="h-5 w-5" />
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			{$toastStore.message}
		</Toast>
	</div>
{/if}

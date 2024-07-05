<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { products, error } = data;
	import { Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	const { form, enhance, submitting } = superForm(data.form, {
		applyAction: true,
		invalidateAll: 'force',
		onResult: ({ result }) => {
			if (result.type == 'failure') {
				toastStore.set({
					message: 'Failed to delete product',
					page: 'products',
					show: true,
					type: 'error'
				});
			} else if (result.type == 'success') {
				toastStore.set({
					message: 'Deleted product successfully',
					page: 'products',
					show: true,
					type: 'success'
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		}
	});
	import { CheckCircleSolid, RocketSolid, CirclePlusSolid } from 'flowbite-svelte-icons';

	import { Card, Tooltip } from 'flowbite-svelte';

	import { onDestroy } from 'svelte';
	import toastStore from '$lib/stores/toastStore';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import DisplayProducts from '$lib/components/products/DisplayProducts.svelte';

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
		<DisplayError message="Error fetching products from the server.Please try again later" />
	{:else}
		<Card class="mx-auto my-4 flex max-w-6xl flex-row items-center justify-between">
			<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
				<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
					<RocketSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
					<span class="sr-only">Light bulb</span>
				</span>
				<span> All the registered A3S products </span>
			</p>

			<div>
				<a href="/dashboard/products/new">
					<CirclePlusSolid />
				</a>

				<Tooltip>Add new product</Tooltip>
			</div>
		</Card>
		{#if products.length > 0}
			<DisplayProducts {form} {enhance} {submitting} {products} />
		{:else}
			<Card color="green" class="center mx-auto max-w-6xl">
				<p class="text-center">
					No A3S products are added yet click on the plus icon on the toolbar to add new product
				</p>
			</Card>
		{/if}
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

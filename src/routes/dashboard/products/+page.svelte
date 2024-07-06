<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { products, error } = data;
	import { Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	const { form, enhance, submitting, message, errors, allErrors } = superForm(data.form, {
		applyAction: true,
		invalidateAll: 'force',
		onResult: async ({ result }) => {
			if (result.type == 'success') {
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
	import {
		CheckCircleSolid,
		RocketSolid,
		CirclePlusSolid,
		ExclamationCircleSolid
	} from 'flowbite-svelte-icons';

	import { Card, Tooltip } from 'flowbite-svelte';

	import { onDestroy } from 'svelte';
	import toastStore from '$lib/stores/toastStore';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import DisplayProducts from '$lib/components/products/DisplayProducts.svelte';
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

<div>
	{#if error}
		<DisplayError message="Error fetching products from the server.Please try again later" />
	{:else}
		<DisplayProducts {form} {enhance} {submitting} {products} />
	{/if}
</div>

{#if $toastStore.show && $toastStore.page === 'products'}
	<div class="fixed bottom-10 right-10">
		<Toast color={$toastStore.type == 'error' ? 'red' : 'green'}>
			<svelte:fragment slot="icon">
				{#if $toastStore.type == 'error'}
					<ExclamationCircleSolid class="h-5 w-5" />
				{:else}
					<CheckCircleSolid class="h-5 w-5" />
				{/if}
			</svelte:fragment>
			{$toastStore.message}
		</Toast>
	</div>
{/if}

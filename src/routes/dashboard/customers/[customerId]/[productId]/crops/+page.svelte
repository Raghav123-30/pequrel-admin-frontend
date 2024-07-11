<script lang="ts">
	export let data;
	const { customerData, cropssData, productsData } = data;
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cropIdSchema } from '$lib/schemas/cropIdSchema.js';
	import DisplayCustomerCrops from '$lib/components/customers/DisplayCustomerCrops.svelte';
	import type { Product } from '$lib/models/product.js';
	import toastStore from '$lib/stores/toastStore.js';
	import { Toast } from 'flowbite-svelte';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	const product =
		productsData.find((item) => item.productId == $page.params.productId) || ({} as Product);
	const { form, errors, submitting, enhance, message } = superForm(data.cropIdform, {
		validators: zod(cropIdSchema),
		onSubmit: () => {
			console.log('submitting');
		},
		onResult: ({ result }) => {
			if (result.type === 'success') {
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			} else if (result.type == 'error') {
				toastStore.set({
					page: 'crops',
					message: 'Failed,please try again later',
					show: true,
					type: 'error'
				});
			}
		}
	});

	message.subscribe((message) => {
		if (message) {
			toastStore.set({
				page: 'crops',
				message: message,
				show: true,
				type: 'success'
			});
		}
	});
</script>

<div class="mx-auto max-w-6xl px-8">
	<DisplayCustomerCrops
		{product}
		cropsData={cropssData}
		{form}
		{customerData}
		{submitting}
		{enhance}
		{errors}
	/>
</div>

{#if $toastStore.show && $toastStore.page === 'crops'}
	<div class="fixed bottom-10 right-10">
		<Toast color={$toastStore.type == 'error' ? 'red' : 'green'}>
			<div class="flex items-center gap-4">
				{#if $toastStore.type == 'error'}
					<ExclamationCircleSolid color="red" />
				{:else}
					<CheckCircleSolid color="green" />
				{/if}

				{$toastStore.message}
			</div>
		</Toast>
	</div>
{/if}

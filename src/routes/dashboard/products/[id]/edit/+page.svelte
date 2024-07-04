<script lang="ts">
	import type { PageData } from './$types';
	import toastStore from '$lib/stores/toastStore';

	import { Card, Input, Label, Button, Helper, Select, Textarea, Toast } from 'flowbite-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { productSchema } from '$lib/schemas/productSchema';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const { productData } = data;

	let pageError = false;
	const { form, enhance, errors, submitting, message } = superForm(data.form, {
		validators: zod(productSchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'products',
					message: 'Your product has been updated',
					show: true,
					type: 'success'
				});
			}
		}
	});

	let productTypes = [
		{ value: 0, name: 'Drying' },
		{ value: 1, name: 'Drying+Growing' }
	];
	onMount(() => {
		if (productData) {
			form.set(productData);
		} else {
			goto('/error');
			pageError = true;
		}
	});
</script>

{#if pageError}
	<p>Invalid product</p>
{:else}
	<div class="px-8 py-20">
		<Card class="mx-auto my-4 max-w-3xl">
			<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Add new product
			</h5>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<div class="space-y-4">
					<Label>Product name</Label>
					<Input
						bind:value={$form.productName}
						name="productName"
						color={$errors.productName && 'red'}
					/>
					{#if $errors.productName}
						<Helper color="red">{$errors.productName}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>Choose type</Label>
					<Select
						name="productType"
						class="mt-2"
						items={productTypes}
						bind:value={$form.productType}
						color={$errors.productType && 'red'}
					/>
					{#if $errors.productType}
						<Helper color="red">{$errors.productType}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>No of layers</Label>
					<Input
						type="number"
						name="numLayers"
						bind:value={$form.numLayers}
						color={$errors.numLayers && 'red'}
					/>
					{#if $errors.numLayers}
						<Helper color="red">{$errors.numLayers}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>No of racks</Label>
					<Input
						type="number"
						name="numRacks"
						bind:value={$form.numRacks}
						color={$errors.numRacks && 'red'}
					/>
					{#if $errors.numRacks}
						<Helper color="red">{$errors.numRacks}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>No of trays</Label>
					<Input
						type="number"
						name="numTrays"
						bind:value={$form.numTrays}
						color={$errors.numTrays && 'red'}
					/>
					{#if $errors.numTrays}
						<Helper color="red">{$errors.numTrays}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>Product area</Label>
					<Input
						step="any"
						type="number"
						name="productArea"
						bind:value={$form.productArea}
						color={$errors.productArea && 'red'}
					/>
					{#if $errors.productArea}
						<Helper color="red">{$errors.productArea}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>Drying area</Label>
					<Input
						step="any"
						name="dryingArea"
						type="number"
						bind:value={$form.dryingArea}
						color={$errors.dryingArea && 'red'}
					/>
					{#if $errors.dryingArea}
						<Helper color="red">{$errors.dryingArea}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>Tray material description</Label>
					<Textarea
						name="trayMaterialDescription"
						rows={6}
						bind:value={$form.trayMaterialDescription}
						color={$errors.trayMaterialDescription && 'red'}
					/>
					{#if $errors.trayMaterialDescription}
						<Helper color="red">{$errors.trayMaterialDescription}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>Electronic material description</Label>
					<Textarea
						name="productElectronicDescription"
						rows={6}
						bind:value={$form.productElectronicDescription}
						color={$errors.productElectronicDescription && 'red'}
					/>
					{#if $errors.productElectronicDescription}
						<Helper color="red">{$errors.productElectronicDescription}</Helper>
					{/if}
				</div>

				<div class="space-y-4">
					<Button type="submit" disabled={$submitting}>
						{$submitting ? 'Updating' : 'Update'}
					</Button>
				</div>
				<div></div>
				{#if $message}
					<div class="fixed bottom-10 right-10">
						<Toast color="red">
							<svelte:fragment slot="icon">
								<CloseCircleSolid class="h-5 w-5" />
								<span class="sr-only">Check icon</span>
							</svelte:fragment>
							{$message}
						</Toast>
					</div>
				{/if}
			</form>
		</Card>
	</div>
{/if}

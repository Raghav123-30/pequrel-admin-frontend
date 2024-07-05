<script lang="ts">
	export let form;
	export let errors;

	import { Label, Input, Helper, Select, Textarea } from 'flowbite-svelte';

	let productTypes = [
		{ value: 0, name: 'Drying' },
		{ value: 1, name: 'Drying+Growing' }
	];
</script>

<div class="space-y-4">
	<Label>Product name</Label>
	<Input bind:value={$form.productName} name="productName" color={$errors.productName && 'red'} />
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

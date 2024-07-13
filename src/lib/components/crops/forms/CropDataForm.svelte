<script lang="ts">
	import { Label, Input, Helper, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	export let form;
	export let errors;
	export let isDefault;
	export let crops: Crop[] = [];
	onMount(() => {
		console.log(crops);
		if (isDefault) {
			$form.city = 'default';
			$form.default = true;
		} else {
			$form.default = false;
		}
	});
	const modeItems = [
		{
			name: 'Drying',
			value: 'Drying'
		},
		{
			name: 'Growing',
			value: 'Growing'
		}
	];

	export let allCategoriesItems;

	import { Country, State, City, type IState } from 'country-state-city';
	import type { Crop } from '$lib/models/crop';
	const countries = Country.getAllCountries();
	const india = countries[100];
	const states = State.getStatesOfCountry(india.isoCode);
	let selectedState: IState;

	if ($form.setupState) {
		let currentState = states.find((state) => state.name === $form.setupState);
		if (currentState) {
			selectedState = currentState;
		}
	}

	$: formattedCities = City.getCitiesOfState(india.isoCode, selectedState?.isoCode)?.map((item) => {
		return {
			value: item.name,
			name: item.name
		};
	});

	const formattedStates = states.map((item) => {
		return {
			value: item.name,
			name: item.name
		};
	});
	let cropState = '';
	const defaultCropSelection = crops.map((item) => {
		return {
			name: item.cropNameEnglish,
			value: item.cropId
		};
	});
	let cropId = '';
</script>

<div class={`space-y-4 ${!isDefault && 'hidden'}`}>
	<Label>Crop name</Label>
	<Input
		bind:value={$form.cropNameEnglish}
		name="cropNameEnglish"
		color={$errors.cropNameEnglish && 'red'}
	/>
	{#if $errors.cropNameEnglish}
		<Helper color="red">{$errors.cropNameEnglish}</Helper>
	{/if}
</div>
<div class={`space-y-4 ${isDefault && 'hidden'}`}>
	<Label>Crop name</Label>
	<Select
		on:change={() => {
			const cropOfInterest = crops.find((item) => item.cropId === cropId);
			if (cropOfInterest) {
				let {
					cropCategoryId,
					cropNameEnglish,
					cropNameKannada,
					cropNameHindi,
					mode,
					city,
					default: isDefault,
					imgUrl,
					...restOfCropData
				} = cropOfInterest;

				form.set({
					cropCategoryId,
					cropNameEnglish,
					cropNameKannada,
					cropNameHindi,
					mode,
					city,
					default: isDefault,
					imgUrl,
					...cropOfInterest.configuration
				});
				$form.default = false;
				$form.city = '';
			}
		}}
		label="Select a crop"
		items={defaultCropSelection}
		bind:value={cropId}
		color={$errors.cropNameEnglish && 'red'}
	/>
	{#if $errors.cropNameEnglish}
		<Helper color="red">{$errors.cropNameEnglish}</Helper>
	{/if}
	<input name="cropNameEnglish" bind:value={$form.cropNameEnglish} class="hidden" />
</div>
<div class={`space-y-4 ${!isDefault && 'hidden'}`}>
	<Label>Crop name (Kannada)</Label>
	<Input
		bind:value={$form.cropNameKannada}
		name="cropNameKannada"
		color={$errors.cropNameKannada && 'red'}
	/>
	{#if $errors.cropNameKannada}
		<Helper color="red">{$errors.cropNameKannada}</Helper>
	{/if}
</div>
<div class={`space-y-4 ${!isDefault && 'hidden'}`}>
	<Label>Crop name (Hindi)</Label>
	<Input
		bind:value={$form.cropNameHindi}
		name="cropNameHindi"
		color={$errors.cropNameHindi && 'red'}
	/>
	{#if $errors.cropNameHindi}
		<Helper color="red">{$errors.cropNameHindi}</Helper>
	{/if}
</div>
<div class={`space-y-4 ${!isDefault && 'hidden'}`}>
	<Label>Mode</Label>
	<Select
		items={modeItems}
		bind:value={$form.mode}
		name="mode"
		color={$errors.mode && 'red'}
		class={!isDefault && 'hidden'}
	/>
	{#if $errors.mode}
		<Helper color="red">{$errors.mode}</Helper>
	{/if}
</div>
<div class={`space-y-4 ${isDefault && 'hidden'} `}>
	<Label>State of the crop</Label>
	<Select
		placeholder="Choose state"
		items={formattedStates}
		bind:value={cropState}
		on:change={() => {
			$form.city = '';
			let currentState = states.find((state) => state.name === cropState);
			if (currentState) {
				selectedState = currentState;
			}
		}}
		name="setupState"
	/>
</div>
<div class={`space-y-4 ${isDefault && 'hidden'} `}>
	<Label>City of the crop</Label>
	<Select
		placeholder="Choose city"
		disabled={!cropState}
		items={formattedCities}
		bind:value={$form.city}
		name="city"
		color={$errors.city && 'red'}
	/>
	{#if $errors.city}
		<Helper color="red">{$errors.city}</Helper>
	{/if}
</div>

<!-- <div class={`space-y-4 ${isDefault && 'hidden'} `}>
	<Label>City</Label>
	<Input bind:value={$form.city} name="city" color={$errors.city && 'red'} disabled={isDefault} />
	{#if $errors.city}
		<Helper color="red">{$errors.city}</Helper>
	{/if}
</div> -->
<div class={`space-y-4 ${!isDefault && 'hidden'}`}>
	<Label>Crop category name</Label>
	<Select
		items={allCategoriesItems}
		bind:value={$form.cropCategoryId}
		name="cropCategoryId"
		color={$errors.cropCategoryId && 'red'}
	/>

	{#if $errors.cropCategoryId}
		<Helper color="red">{$errors.cropCategoryId}</Helper>
	{/if}
</div>

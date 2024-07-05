<script lang="ts">
	export let form;
	export let errors;
	import { Country, State, City, type IState } from 'country-state-city';
	import { Label, Input, Helper, Select, Textarea } from 'flowbite-svelte';
	const countries = Country.getAllCountries();
	const india = countries[100];
	const states = State.getStatesOfCountry(india.isoCode);
	let selectedState: IState;
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
</script>

<div class="space-y-4">
	<Label>Customer Name</Label>
	<Input
		bind:value={$form.customerName}
		name="customerName"
		color={$errors.customerName && 'red'}
	/>
	{#if $errors.customerName}
		<Helper color="red">{$errors.customerName}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Email</Label>
	<Input
		type="email"
		bind:value={$form.customerEmail}
		name="customerEmail"
		color={$errors.customerEmail && 'red'}
	/>
	{#if $errors.customerEmail}
		<Helper color="red">{$errors.customerEmail}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Phone</Label>
	<Input
		bind:value={$form.customerPhone}
		name="customerPhone"
		color={$errors.customerPhone && 'red'}
	/>
	{#if $errors.customerPhone}
		<Helper color="red">{$errors.customerPhone}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Address</Label>
	<Input
		bind:value={$form.customerAddress}
		name="customerAddress"
		color={$errors.customerAddress && 'red'}
	/>
	{#if $errors.customerAddress}
		<Helper color="red">{$errors.customerAddress}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>State of the setup</Label>
	<Select
		placeholder="Choose state"
		items={formattedStates}
		bind:value={$form.setupState}
		on:change={() => {
			$form.setupCity = '';
			let currentState = states.find((state) => state.name === $form.setupState);
			if (currentState) {
				selectedState = currentState;
			}
		}}
		name="setupState"
		color={$errors.setupState && 'red'}
	/>
	{#if $errors.setupState}
		<Helper color="red">{$errors.setupState}</Helper>
	{/if}
</div>
<div class="space-y-4">
	<Label>City of the setup</Label>
	<Select
		placeholder="Choose city"
		disabled={!$form.setupState}
		items={formattedCities}
		bind:value={$form.setupCity}
		name="setupCity"
		color={$errors.setupCity && 'red'}
	/>
	{#if $errors.setupCity}
		<Helper color="red">{$errors.setupCity}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Setup Address</Label>
	<Textarea
		bind:value={$form.setupAddress}
		name="setupAddress"
		color={$errors.setupAddress && 'red'}
	/>
	{#if $errors.setupAddress}
		<Helper color="red">{$errors.setupAddress}</Helper>
	{/if}
</div>

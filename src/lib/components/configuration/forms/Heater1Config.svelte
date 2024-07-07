<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';

	export let form;
	export let errors;
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
	<div class="space-y-4">
		<Label>Heater1 High(Temperature)</Label>
		<Input
			type="number"
			name="heater1HighTemp"
			bind:value={$form.heater1HighTemp}
			color={$errors.heater1HighTemp && 'red'}
		/>
		{#if $errors.heater1HighTemp}
			<Helper color="red">{$errors.heater1HighTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="heater1HighOnFor"
			bind:value={$form.heater1HighOnFor}
			color={$errors.heater1HighOnFor && 'red'}
		/>
		{#if $errors.heater1HighOnFor}
			<Helper color="red">{$errors.heater1HighOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="heater1HighOffFor"
			bind:value={$form.heater1HighOffFor}
			color={$errors.heater1HighOffFor && 'red'}
		/>
		{#if $errors.heater1HighOffFor}
			<Helper color="red">{$errors.heater1HighOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Heater1 Med(Temperature)</Label>
		<Input
			type="number"
			name="heater1MedTemp"
			bind:value={$form.heater1MedTemp}
			color={$errors.heater1MedTemp && 'red'}
		/>
		{#if $errors.heater1MedTemp}
			<Helper color="red">{$errors.heater1MedTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="heater1MedOnFor"
			bind:value={$form.heater1MedOnFor}
			color={$errors.heater1MedOnFor && 'red'}
		/>
		{#if $errors.heater1MedOnFor}
			<Helper color="red">{$errors.heater1MedOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="heater1MedOffFor"
			bind:value={$form.heater1MedOffFor}
			color={$errors.heater1MedOffFor && 'red'}
		/>
		{#if $errors.heater1MedOffFor}
			<Helper color="red">{$errors.heater1MedOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Heater1 Low(Temperature)</Label>
		<Input
			type="number"
			name="heater1LowTemp"
			bind:value={$form.heater1LowTemp}
			color={$errors.heater1LowTemp && 'red'}
		/>
		{#if $errors.heater1LowTemp}
			<Helper color="red">{$errors.heater1LowTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="heater1LowOnFor"
			bind:value={$form.heater1LowOnFor}
			color={$errors.heater1LowOnFor && 'red'}
		/>
		{#if $errors.heater1LowOnFor}
			<Helper color="red">{$errors.heater1LowOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="heater1LowOffFor"
			bind:value={$form.heater1LowOffFor}
			color={$errors.heater1LowOffFor && 'red'}
		/>
		{#if $errors.heater1LowOffFor}
			<Helper color="red">{$errors.heater1LowOffFor}</Helper>
		{/if}
	</div>
</div>

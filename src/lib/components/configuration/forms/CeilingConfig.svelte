<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';

	export let form;
	export let errors;
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
	<div class="space-y-4">
		<Label>ceiling High Temp</Label>
		<Input
			type="number"
			name="ceilingHighTemp"
			bind:value={$form.ceilingHighTemp}
			color={$errors.ceilingHighTemp && 'red'}
		/>
		{#if $errors.ceilingHighTemp}
			<Helper color="red">{$errors.ceilingHighTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling High On For</Label>
		<Input
			type="number"
			name="ceilingHighOnFor"
			bind:value={$form.ceilingHighOnFor}
			color={$errors.ceilingHighOnFor && 'red'}
		/>
		{#if $errors.ceilingHighOnFor}
			<Helper color="red">{$errors.ceilingHighOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling High Off For</Label>
		<Input
			type="number"
			name="ceilingHighOffFor"
			bind:value={$form.ceilingHighOffFor}
			color={$errors.ceilingHighOffFor && 'red'}
		/>
		{#if $errors.ceilingHighOffFor}
			<Helper color="red">{$errors.ceilingHighOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Med Temp</Label>
		<Input
			type="number"
			name="ceilingMedTemp"
			bind:value={$form.ceilingMedTemp}
			color={$errors.ceilingMedTemp && 'red'}
		/>
		{#if $errors.ceilingMedTemp}
			<Helper color="red">{$errors.ceilingMedTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Med On For</Label>
		<Input
			type="number"
			name="ceilingMedOnFor"
			bind:value={$form.ceilingMedOnFor}
			color={$errors.ceilingMedOnFor && 'red'}
		/>
		{#if $errors.ceilingMedOnFor}
			<Helper color="red">{$errors.ceilingMedOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Med Off For</Label>
		<Input
			type="number"
			name="ceilingMedOffFor"
			bind:value={$form.ceilingMedOffFor}
			color={$errors.ceilingMedOffFor && 'red'}
		/>
		{#if $errors.ceilingMedOffFor}
			<Helper color="red">{$errors.ceilingMedOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Low Temp</Label>
		<Input
			type="number"
			name="ceilingLowTemp"
			bind:value={$form.ceilingLowTemp}
			color={$errors.ceilingLowTemp && 'red'}
		/>
		{#if $errors.ceilingLowTemp}
			<Helper color="red">{$errors.ceilingLowTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Low On For</Label>
		<Input
			type="number"
			name="ceilingLowOnFor"
			bind:value={$form.ceilingLowOnFor}
			color={$errors.ceilingLowOnFor && 'red'}
		/>
		{#if $errors.ceilingLowOnFor}
			<Helper color="red">{$errors.ceilingLowOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>ceiling Low Off For</Label>
		<Input
			type="number"
			name="ceilingLowOffFor"
			bind:value={$form.ceilingLowOffFor}
			color={$errors.ceilingLowOffFor && 'red'}
		/>
		{#if $errors.ceilingLowOffFor}
			<Helper color="red">{$errors.ceilingLowOffFor}</Helper>
		{/if}
	</div>
</div>

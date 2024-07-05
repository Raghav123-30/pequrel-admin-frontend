<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';

	export let form;
	export let errors;
</script>

<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
	<div class="space-y-4">
		<Label>top High Temp</Label>
		<Input
			type="number"
			name="topHighTemp"
			bind:value={$form.topHighTemp}
			color={$errors.topHighTemp && 'red'}
		/>
		{#if $errors.topHighTemp}
			<Helper color="red">{$errors.topHighTemp}</Helper>
		{/if}
	</div>

	<div class="space-y-4">
		<Label>top High On For</Label>
		<Input
			type="number"
			name="topHighOnFor"
			bind:value={$form.topHighOnFor}
			color={$errors.topHighOnFor && 'red'}
		/>
		{#if $errors.topHighOnFor}
			<Helper color="red">{$errors.topHighOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top High Off For</Label>
		<Input
			type="number"
			name="topHighOffFor"
			bind:value={$form.topHighOffFor}
			color={$errors.topHighOffFor && 'red'}
		/>
		{#if $errors.topHighOffFor}
			<Helper color="red">{$errors.topHighOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Med Temp</Label>
		<Input
			type="number"
			name="topMedTemp"
			bind:value={$form.topMedTemp}
			color={$errors.topMedTemp && 'red'}
		/>
		{#if $errors.topMedTemp}
			<Helper color="red">{$errors.topMedTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Med On For</Label>
		<Input
			type="number"
			name="topMedOnFor"
			bind:value={$form.topMedOnFor}
			color={$errors.topMedOnFor && 'red'}
		/>
		{#if $errors.topMedOnFor}
			<Helper color="red">{$errors.topMedOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Med Off For</Label>
		<Input
			type="number"
			name="topMedOffFor"
			bind:value={$form.topMedOffFor}
			color={$errors.topMedOffFor && 'red'}
		/>
		{#if $errors.topMedOffFor}
			<Helper color="red">{$errors.topMedOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Low Temp</Label>
		<Input
			type="number"
			name="topLowTemp"
			bind:value={$form.topLowTemp}
			color={$errors.topLowTemp && 'red'}
		/>
		{#if $errors.topLowTemp}
			<Helper color="red">{$errors.topLowTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Low On For</Label>
		<Input
			type="number"
			name="topLowOnFor"
			bind:value={$form.topLowOnFor}
			color={$errors.topLowOnFor && 'red'}
		/>
		{#if $errors.topLowOnFor}
			<Helper color="red">{$errors.topLowOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>top Low Off For</Label>
		<Input
			type="number"
			name="topLowOffFor"
			bind:value={$form.topLowOffFor}
			color={$errors.topLowOffFor && 'red'}
		/>
		{#if $errors.topLowOffFor}
			<Helper color="red">{$errors.topLowOffFor}</Helper>
		{/if}
	</div>
</div>

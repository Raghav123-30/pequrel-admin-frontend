<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';

	export let form;
	export let errors;
</script>

<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
	<div class="space-y-4">
		<Label>Horizontal High(Temperature)</Label>
		<Input
			type="number"
			name="horizontalHighTemp"
			bind:value={$form.horizontalHighTemp}
			color={$errors.horizontalHighTemp && 'red'}
		/>
		{#if $errors.horizontalHighTemp}
			<Helper color="red">{$errors.horizontalHighTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="horizontalHighOnFor"
			bind:value={$form.horizontalHighOnFor}
			color={$errors.horizontalHighOnFor && 'red'}
		/>
		{#if $errors.horizontalHighOnFor}
			<Helper color="red">{$errors.horizontalHighOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="horizontalHighOffFor"
			bind:value={$form.horizontalHighOffFor}
			color={$errors.horizontalHighOffFor && 'red'}
		/>
		{#if $errors.horizontalHighOffFor}
			<Helper color="red">{$errors.horizontalHighOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Horizontal Med(Temperature)</Label>
		<Input
			type="number"
			name="horizontalMedTemp"
			bind:value={$form.horizontalMedTemp}
			color={$errors.horizontalMedTemp && 'red'}
		/>
		{#if $errors.horizontalMedTemp}
			<Helper color="red">{$errors.horizontalMedTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="horizontalMedOnFor"
			bind:value={$form.horizontalMedOnFor}
			color={$errors.horizontalMedOnFor && 'red'}
		/>
		{#if $errors.horizontalMedOnFor}
			<Helper color="red">{$errors.horizontalMedOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="horizontalMedOffFor"
			bind:value={$form.horizontalMedOffFor}
			color={$errors.horizontalMedOffFor && 'red'}
		/>
		{#if $errors.horizontalMedOffFor}
			<Helper color="red">{$errors.horizontalMedOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Horizontal Low(Temperature)</Label>
		<Input
			type="number"
			name="horizontalLowTemp"
			bind:value={$form.horizontalLowTemp}
			color={$errors.horizontalLowTemp && 'red'}
		/>
		{#if $errors.horizontalLowTemp}
			<Helper color="red">{$errors.horizontalLowTemp}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="horizontalLowOnFor"
			bind:value={$form.horizontalLowOnFor}
			color={$errors.horizontalLowOnFor && 'red'}
		/>
		{#if $errors.horizontalLowOnFor}
			<Helper color="red">{$errors.horizontalLowOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="horizontalLowOffFor"
			bind:value={$form.horizontalLowOffFor}
			color={$errors.horizontalLowOffFor && 'red'}
		/>
		{#if $errors.horizontalLowOffFor}
			<Helper color="red">{$errors.horizontalLowOffFor}</Helper>
		{/if}
	</div>
</div>

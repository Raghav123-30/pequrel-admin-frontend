<script lang="ts">
	export let form;
	export let errors;
	import { Label, Input, Helper } from 'flowbite-svelte';
</script>

<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
	<div class="space-y-4">
		<Label>Bottom High(Humidity)</Label>
		<Input
			type="number"
			name="bottomHighHumid"
			bind:value={$form.bottomHighHumid}
			color={$errors.bottomHighHumid && 'red'}
		/>
		{#if $errors.bottomHighHumid}
			<Helper color="red">{$errors.bottomHighHumid}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="bottomHighOnFor"
			bind:value={$form.bottomHighOnFor}
			color={$errors.bottomHighOnFor && 'red'}
		/>
		{#if $errors.bottomHighOnFor}
			<Helper color="red">{$errors.bottomHighOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="bottomHighOffFor"
			bind:value={$form.bottomHighOffFor}
			color={$errors.bottomHighOffFor && 'red'}
		/>
		{#if $errors.bottomHighOffFor}
			<Helper color="red">{$errors.bottomHighOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Bottom Med(Temperature)</Label>
		<Input
			type="number"
			name="bottomMedHumid"
			bind:value={$form.bottomMedHumid}
			color={$errors.bottomMedHumid && 'red'}
		/>
		{#if $errors.bottomMedHumid}
			<Helper color="red">{$errors.bottomMedHumid}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="bottomMedOnFor"
			bind:value={$form.bottomMedOnFor}
			color={$errors.bottomMedOnFor && 'red'}
		/>
		{#if $errors.bottomMedOnFor}
			<Helper color="red">{$errors.bottomMedOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="bottomMedOffFor"
			bind:value={$form.bottomMedOffFor}
			color={$errors.bottomMedOffFor && 'red'}
		/>
		{#if $errors.bottomMedOffFor}
			<Helper color="red">{$errors.bottomMedOffFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Bottom Low(Humidity)</Label>
		<Input
			type="number"
			name="bottomLowHumid"
			bind:value={$form.bottomLowHumid}
			color={$errors.bottomLowHumid && 'red'}
		/>
		{#if $errors.bottomLowHumid}
			<Helper color="red">{$errors.bottomLowHumid}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>On For</Label>
		<Input
			type="number"
			name="bottomLowOnFor"
			bind:value={$form.bottomLowOnFor}
			color={$errors.bottomLowOnFor && 'red'}
		/>
		{#if $errors.bottomLowOnFor}
			<Helper color="red">{$errors.bottomLowOnFor}</Helper>
		{/if}
	</div>
	<div class="space-y-4">
		<Label>Off For</Label>
		<Input
			type="number"
			name="bottomLowOffFor"
			bind:value={$form.bottomLowOffFor}
			color={$errors.bottomLowOffFor && 'red'}
		/>
		{#if $errors.bottomLowOffFor}
			<Helper color="red">{$errors.bottomLowOffFor}</Helper>
		{/if}
	</div>
</div>

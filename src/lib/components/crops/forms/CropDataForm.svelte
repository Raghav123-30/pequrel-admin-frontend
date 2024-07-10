<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	export let form;
	export let errors;
	export let isDefault;

	onMount(() => {
		if (isDefault) {
			$form.city = 'default';
			$form.default = true;
		} else {
			$form.default = false;
		}
	});
</script>

<div class="space-y-4">
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
<div class="space-y-4">
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
<div class="space-y-4">
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
<div class="space-y-4">
	<Label>Mode</Label>
	<Input bind:value={$form.mode} name="mode" color={$errors.mode && 'red'} />
	{#if $errors.mode}
		<Helper color="red">{$errors.mode}</Helper>
	{/if}
</div>
<div class={`space-y-4 ${isDefault && 'hidden'} `}>
	<Label>City</Label>
	<Input bind:value={$form.city} name="city" color={$errors.city && 'red'} disabled={isDefault} />
	{#if $errors.city}
		<Helper color="red">{$errors.city}</Helper>
	{/if}
</div>
<div class="space-y-4">
	<Label>Crop category name</Label>
	<Input
		bind:value={$form.cropCategoryId}
		name="cropCategoryId"
		color={$errors.cropCategoryId && 'red'}
	/>
	{#if $errors.cropCategoryId}
		<Helper color="red">{$errors.cropCategoryId}</Helper>
	{/if}
</div>

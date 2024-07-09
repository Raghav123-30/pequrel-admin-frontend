<script lang="ts">
	export let form;
	export let errors;

	import { Label, Input, Helper } from 'flowbite-svelte';
</script>

<div class="space-y-4">
	<Label>Category name(English)</Label>
	<Input
		bind:value={$form.cropCategoryNameEnglish}
		name="cropCategoryNameEnglish"
		color={$errors.cropCategoryNameEnglish && 'red'}
	/>
	{#if $errors.cropCategoryNameEnglish}
		<Helper color="red">{$errors.cropCategoryNameEnglish}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Category name(Kannada)</Label>
	<Input
		type="text"
		bind:value={$form.cropCategoryNameKannada}
		name="cropCategoryNameKannada"
		color={$errors.cropCategoryNameKannada && 'red'}
	/>
	{#if $errors.cropCategoryNameKannada}
		<Helper color="red">{$errors.cropCategoryNameKannada}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Category name(Hindi)</Label>
	<Input
		type="text"
		bind:value={$form.cropCategoryNameHindi}
		name="cropCategoryNameHindi"
		color={$errors.cropCategoryNameHindi && 'red'}
	/>
	{#if $errors.cropCategoryNameHindi}
		<Helper color="red">{$errors.cropCategoryNameHindi}</Helper>
	{/if}
</div>

<script lang="ts">
	import { Card, Label, Input, Textarea, Button, Helper } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import toastStore from '$lib/stores/toastStore';
	import { zod } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';

	import type { PageData } from './$types';

	import { cropSchema } from '$lib/schemas/cropSchema';
	import TopExhaustConfig from '$lib/components/configuration/forms/TopExhaustConfig.svelte';
	import CeilingConfig from '$lib/components/configuration/forms/CeilingConfig.svelte';
	import Heater1Config from '$lib/components/configuration/forms/Heater1Config.svelte';
	import BottomExhaustConfig from '$lib/components/configuration/forms/BottomExhaustConfig.svelte';
	import HorizontalAirflowConfig from '$lib/components/configuration/forms/HorizontalAirflowConfig.svelte';
	export let data: PageData;

	const { form, enhance, errors, submitting, message } = superForm(data.form, {
		validators: zod(cropSchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'crops',
					message: 'New crop has been added',
					show: true,
					type: 'success'
				});
			}
		}
	});
</script>

<SuperDebug data={form} />

<div class="px-8 py-20">
	<Card class="mx-auto my-4 max-w-3xl">
		<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Add new crop
		</h5>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
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
			<div class="space-y-4">
				<Label>City</Label>
				<Input bind:value={$form.city} name="city" color={$errors.city && 'red'} />
				{#if $errors.city}
					<Helper color="red">{$errors.city}</Helper>
				{/if}
			</div>
			<div class="space-y-4">
				<Label>Crop category name</Label>
				<Input
					bind:value={$form.cropCategoryName}
					name="cropCategoryName"
					color={$errors.cropCategoryName && 'red'}
				/>
				{#if $errors.cropCategoryName}
					<Helper color="red">{$errors.cropCategoryName}</Helper>
				{/if}
			</div>
			<div class="space-y-4">
				<Label>Special instructions</Label>
				<Textarea
					name="specialInstructions"
					rows={6}
					bind:value={$form.specialInstructions}
					color={$errors.specialInstructions && 'red'}
				/>
				{#if $errors.specialInstructions}
					<Helper color="red">{$errors.specialInstructions}</Helper>
				{/if}
			</div>
			<div class="space-y-4">
				<Label>Special instructions (Kannada)</Label>
				<Textarea
					name="specialInstructionsKannada"
					rows={6}
					bind:value={$form.specialInstructionsKannada}
					color={$errors.specialInstructionsKannada && 'red'}
				/>
				{#if $errors.specialInstructionsKannada}
					<Helper color="red">{$errors.specialInstructionsKannada}</Helper>
				{/if}
			</div>
			<div class="space-y-4">
				<Label>Special instructions (Hindi)</Label>
				<Textarea
					name="specialInstructionsHindi"
					rows={6}
					bind:value={$form.specialInstructionsHindi}
					color={$errors.specialInstructionsHindi && 'red'}
				/>
				{#if $errors.specialInstructionsHindi}
					<Helper color="red">{$errors.specialInstructionsHindi}</Helper>
				{/if}
			</div>
			<CeilingConfig {form} {errors} />
			<TopExhaustConfig {form} {errors} />
			<BottomExhaustConfig {form} {errors} />
			<HorizontalAirflowConfig {form} {errors} />
			<Heater1Config {form} {errors} />

			<div class="space-y-4">
				<Button type="submit" disabled={$submitting}>
					{$submitting ? 'submitting' : 'submit'}
				</Button>
			</div>
		</form>
	</Card>
</div>

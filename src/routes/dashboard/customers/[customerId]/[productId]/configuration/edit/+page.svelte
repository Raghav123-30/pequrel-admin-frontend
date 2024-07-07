<script lang="ts">
	import {
		configurationSchema,
		horizontalAirflowConfigSchema,
		bottomExhaustConfigSchema,
		topExhaustConfigSchema,
		ceilingConfigSchema
	} from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Progressbar, Button, Card } from 'flowbite-svelte';
	import {
		CeilingConfig,
		TopExhaustConfig,
		BottomExhaustConfig,
		HorizontalAirflowConfig,
		Heater1Config
	} from '$lib/components/configuration/forms';

	import { onMount } from 'svelte';
	import toastStore from '$lib/stores/toastStore.js';

	export let data;
	const { configuration } = data;
	const { form, errors, submitting, enhance, validateForm } = superForm(data.form, {
		validators: zod(configurationSchema),
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type == 'redirect') {
				toastStore.set({
					type: 'success',
					message: 'Configuration is updated',
					page: 'customers',
					show: true
				});
			} else {
				toastStore.set({
					type: 'error',
					message: 'Failed to update configuration',
					page: 'customers',
					show: true
				});
			}
		}
	});
	const checkIsNextForCeilingConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(ceilingConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForTopExhaustConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(topExhaustConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForBottomExhaustConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(bottomExhaustConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForHorizontalConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(horizontalAirflowConfigSchema), update: true });

		return result.valid;
	};
	console.log(configuration);
	let step = 1;
	onMount(() => {
		form.set(configuration);
	});
	onMount(() => {
		form.set(configuration);
	});
</script>

<div class="mx-auto max-w-6xl px-8">
	<div class="mx-auto my-8 max-w-6xl">
		<Progressbar progress={(step / 5) * 100} />
	</div>

	<Card class="mx-auto my-4 max-w-6xl">
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			{#if step == 1}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Update ceiling configuration details
				</h5>
				<CeilingConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button
						on:click={async () => {
							const valid = await checkIsNextForCeilingConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 2}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Update top exhaust configuration details
				</h5>
				<TopExhaustConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForTopExhaustConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 3}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Update bottom exhaust configuration details
				</h5>
				<BottomExhaustConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForBottomExhaustConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 4}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Update horitzontal airflow configuration details
				</h5>
				<HorizontalAirflowConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForHorizontalConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 5}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Update heater 1 configuration details
				</h5>
				<Heater1Config {form} {errors} />
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
						<Button type="submit" disabled={$submitting}>
							{$submitting ? 'submitting' : 'submit'}
						</Button>
					</div>
				</div>
			{/if}
		</form>
	</Card>
</div>

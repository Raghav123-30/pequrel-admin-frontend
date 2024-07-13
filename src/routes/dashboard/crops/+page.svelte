<script lang="ts">
	import toastStore from '$lib/stores/toastStore';
	import { Toast } from 'flowbite-svelte';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import DisplayCategories from '$lib/components/crops/DisplayCategories.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cropCategoryIdSchema } from '$lib/schemas/cropCategoryIdSchema.js';
	import { Card } from 'flowbite-svelte';
	import DisplayDefaultCrops from '$lib/components/crops/DisplayDefaultCrops.svelte';
	import DisplaySpecificCrops from '$lib/components/crops/DisplaySpecificCrops.svelte';
	export let data;
	const { cropCategories, allCrops } = data;
	const defaultCrops = allCrops.filter((item) => item.default === true);
	const specificCrops = allCrops.filter((item) => item.default === false);
	const { form, enhance, errors, submitting, message } = superForm(data.cropCategoryIdForm, {
		validators: zod(cropCategoryIdSchema),
		onResult: ({ result }) => {
			if (result.type == 'success') {
				toastStore.set({
					type: 'success',
					message: 'Deleted crop category successfully',
					page: 'crops',
					show: true
				});
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}
		}
	});
	message.subscribe((message) => {
		if (message) {
			toastStore.set({
				type: 'error',
				message: message,
				page: 'crops',
				show: true
			});
		}
	});
	console.log('categories are as follows');
	console.log(data);
</script>

<div class="space-y-6">
	<Card class="mx-auto my-4 max-w-6xl p-2" color="none">
		<DisplayCategories categories={cropCategories} {form} {enhance} {submitting} />
	</Card>
	<Card class="mx-auto my-4 max-w-6xl p-2" color="none">
		<DisplayDefaultCrops categories={cropCategories} {defaultCrops} {form} {enhance} {submitting} />
	</Card>
	<Card class="mx-auto my-4 max-w-6xl p-2" color="none">
		<DisplaySpecificCrops
			categories={cropCategories}
			{specificCrops}
			{form}
			{enhance}
			{submitting}
		/>
	</Card>
</div>

{#if $toastStore.show && $toastStore.page === 'crops'}
	<div class="fixed bottom-10 right-10">
		<Toast color={$toastStore.type == 'error' ? 'red' : 'green'}>
			<div class="flex items-center gap-4">
				{#if $toastStore.type == 'error'}
					<ExclamationCircleSolid color="red" />
				{:else}
					<CheckCircleSolid color="green" />
				{/if}

				{$toastStore.message}
			</div>
		</Toast>
	</div>
{/if}

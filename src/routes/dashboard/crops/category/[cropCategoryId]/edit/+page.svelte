<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	export let data;
	const { cropCategories } = data;

	import { Toast, Card, Button } from 'flowbite-svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import CropCategoryForm from '$lib/components/crops/forms/CropCategoryForm.svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';

	import { zod } from 'sveltekit-superforms/adapters';
	import { cropCategorySchema } from '$lib/schemas/cropCategorySchema.js';
	const cropCategoryId = $page.params.cropCategoryId;
	import toastStore from '$lib/stores/toastStore.js';
	const categoryToBeUpdated = cropCategories.find((item) => (item.cropCategoryId = cropCategoryId));
	const {
		form: categoryForm,
		enhance,
		errors,
		submitting,
		message
	} = superForm(data.categoryForm, {
		validators: zod(cropCategorySchema),
		onResult: ({ result }) => {
			if (result.type == 'redirect') {
				toastStore.set({
					page: 'crops',
					message: 'Your crop category data has been updated',
					show: true,
					type: 'success'
				});
			}
		}
	});
	let pageError = false;
	onMount(() => {
		if (categoryToBeUpdated) {
			categoryForm.set(categoryToBeUpdated);
		} else {
			pageError = true;
		}
	});
</script>

{#if pageError}
	<DisplayError message="Record of that customer does not exist in the server" />
{:else}
	<div class="px-8 py-20">
		<Card class="mx-auto my-4 max-w-3xl">
			<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Update crop category details
			</h5>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<CropCategoryForm form={categoryForm} {errors} />

				<div class="space-y-4">
					<Button type="submit" disabled={$submitting}>
						{$submitting ? 'Updating' : 'Update'}
					</Button>
				</div>
				<div></div>
				{#if $message}
					<div class="fixed bottom-10 right-10">
						<Toast color="red">
							<svelte:fragment slot="icon">
								<CloseCircleSolid class="h-5 w-5" />
							</svelte:fragment>
							{$message}
						</Toast>
					</div>
				{/if}
			</form>
		</Card>
	</div>
{/if}

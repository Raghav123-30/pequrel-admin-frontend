<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import toastStore from '$lib/stores/toastStore';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Toast } from 'flowbite-svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';

	import { cropCategorySchema } from '$lib/schemas';
	import CropCategoryForm from '$lib/components/crops/forms/CropCategoryForm.svelte';

	export let data: PageData;

	const { form, enhance, errors, submitting, message } = superForm(data.categoryForm, {
		validators: zod(cropCategorySchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'crops',
					message: 'New category has been added',
					show: true,
					type: 'success'
				});
			}
		}
	});
</script>

<div class="px-8 py-20">
	<Card class="mx-auto my-4 max-w-3xl">
		<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Add new crop category
		</h5>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			<CropCategoryForm {form} {errors} />

			<div class="space-y-4">
				<Button type="submit" disabled={$submitting}>
					{$submitting ? 'submitting' : 'submit'}
				</Button>
			</div>

			{#if $message}
				<div class="fixed bottom-10 right-10">
					<Toast color="red">
						<svelte:fragment slot="icon">
							<CloseCircleSolid class="h-5 w-5" />
							<span class="sr-only">Check icon</span>
						</svelte:fragment>
						{$message}
					</Toast>
				</div>
			{/if}
		</form>
	</Card>
</div>

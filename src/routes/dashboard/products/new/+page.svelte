<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Product } from '$lib/models/product';
	import toastStore from '$lib/stores/toastStore';
	import { zod } from 'sveltekit-superforms/adapters';
	import { productSchema } from '$lib/schemas/productSchema';
	import { Toast } from 'flowbite-svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import ProductForm from '$lib/components/products/ProductForm.svelte';

	export let data: PageData;

	const { form, enhance, errors, submitting, message } = superForm(data.form, {
		validators: zod(productSchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'products',
					message: 'New product has been added',
					show: true,
					type: 'success'
				});
			}
		}
	});

	form.set({} as Product);
</script>

<div class="px-8 py-20">
	<Card class="mx-auto my-4 max-w-3xl">
		<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Add new product
		</h5>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			<ProductForm {form} {errors} />

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

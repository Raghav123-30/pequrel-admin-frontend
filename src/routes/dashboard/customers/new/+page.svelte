<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import toastStore from '$lib/stores/toastStore';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Toast } from 'flowbite-svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';

	import { CustomerSchema } from '$lib/schemas/customerSchema';
	import CustomerForm from '$lib/components/customers/CustomerForm.svelte';
	import SuperDebug from 'sveltekit-superforms';

	export let data: PageData;

	const { form, enhance, errors, submitting, message } = superForm(data.form, {
		validators: zod(CustomerSchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'products',
					message: 'New customer has been added',
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
			Add new customer
		</h5>
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			<CustomerForm {form} {errors} />

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

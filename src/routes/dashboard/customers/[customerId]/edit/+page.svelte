<script lang="ts">
	import type { PageData } from './$types';
	import toastStore from '$lib/stores/toastStore';

	import { Card, Button, Toast } from 'flowbite-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms';

	import { onMount } from 'svelte';

	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import { customerSchema } from '$lib/schemas';
	import CustomerForm from '$lib/components/customers/CustomerForm.svelte';

	export let data: PageData;
	const { customerData } = data;

	let pageError = false;
	const { form, enhance, errors, submitting, message } = superForm(data.form, {
		validators: zod(customerSchema),

		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'customers',
					message: 'Your customer data has been updated',
					show: true,
					type: 'success'
				});
			}
		}
	});

	onMount(() => {
		if (customerData) {
			form.set({ ...customerData, setupState: '', setupCity: '' });
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
				Update customer details
			</h5>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<CustomerForm {form} {errors} />

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

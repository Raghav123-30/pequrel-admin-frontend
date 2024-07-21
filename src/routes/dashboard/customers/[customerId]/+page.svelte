<script lang="ts">
	import { page } from '$app/stores';
	import IotSection from '$lib/components/iot/IotSection.svelte';

	import type { PageData } from './$types';

	import DisplayCustomerProducts from '$lib/components/customers/DisplayCustomerProducts.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { productIdSchema } from '$lib/schemas/productIdSchema';
	import toastStore from '$lib/stores/toastStore';
	import { onDestroy } from 'svelte';
	import { Toast } from 'flowbite-svelte';
	import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import { customerProductSchema } from '$lib/schemas/customerProductSchema';

	export let data: PageData;
	const { productsData, customerData } = data;
	const {
		form: customerProductForm,
		errors: customerProductFormErrors,
		enhance: customerProductFormEnhance,
		message: customerProductFormMessage,
		submitting: customerProductFormSubmitting
	} = superForm(data.form, {
		validators: zod(customerProductSchema),
		onSubmit: () => {
			toastStore.set({
				message: '',
				page: 'customers',
				show: false,
				type: 'success'
			});
		},
		onResult: async ({ result }) => {
			if (result.type == 'redirect') {
				console.log('setting toast');
				toastStore.set({
					message: 'You have successfully edited product record of your customer ',
					page: 'customers',
					show: true,
					type: 'success'
				});
			} else if (result.type == 'error') {
				toastStore.set({
					message: 'Failed to edit product record of your customer',
					page: 'customers',
					show: true,
					type: 'error'
				});
			}
		}
	});
	const { form, errors, enhance, message, submitting } = superForm(data.customerProductForm, {
		validators: zod(productIdSchema),
		onSubmit: () => {
			toastStore.set({
				message: '',
				page: 'customers',
				show: false,
				type: 'success'
			});
		},
		onResult: async ({ result }) => {
			if (result.type == 'redirect') {
				console.log('setting toast');
				toastStore.set({
					message: 'You have successfully edited product record of your customer ',
					page: 'customers',
					show: true,
					type: 'success'
				});
			} else if (result.type == 'error') {
				toastStore.set({
					message: 'Failed to edit product record of your customer',
					page: 'customers',
					show: true,
					type: 'error'
				});
			}
		}
	});
	message.subscribe((value) => {
		if (value) {
			toastStore.set({
				message: value,
				page: 'customers',
				show: true,
				type: 'success'
			});
		}
	});
	customerProductFormMessage.subscribe((value) => {
		if (value) {
			toastStore.set({
				message: value,
				page: 'customers',
				show: true,
				type: 'success'
			});
		}
	});
	// onDestroy(() => {
	// 	toastStore.set({
	// 		page: 'customers',
	// 		show: false,
	// 		message: '',
	// 		type: 'success'
	// 	});
	// });
</script>

<div class="space-y-4 px-8 py-10">
	<div>
		<IotSection {customerData} {productsData} />
	</div>
	<div>
		<DisplayCustomerProducts
			{customerData}
			{productsData}
			{form}
			{errors}
			{enhance}
			{submitting}
			{customerProductForm}
			{customerProductFormErrors}
			{customerProductFormSubmitting}
			{customerProductFormEnhance}
		/>
	</div>
</div>

{#if $toastStore.show && $toastStore.page === 'customers'}
	<div class="fixed bottom-10 right-10">
		<Toast color={$toastStore.type == 'error' ? 'red' : 'green'}>
			<svelte:fragment slot="icon">
				{#if $toastStore.type == 'error'}
					<ExclamationCircleSolid class="h-5 w-5" />
				{:else}
					<CheckCircleSolid class="h-5 w-5" />
				{/if}
			</svelte:fragment>
			{$toastStore.message}
		</Toast>
	</div>
{/if}

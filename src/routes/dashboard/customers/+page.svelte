<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { customers, error } = data;
	import { Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	const { form, enhance, submitting, message } = superForm(data.form, {
		applyAction: true,
		invalidateAll: 'force',
		onResult: ({ result }) => {
			if (result.type == 'success') {
				toastStore.set({
					message: 'Deleted customer data successfully',
					page: 'customers',
					show: true,
					type: 'success'
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		}
	});
	import {
		CheckCircleSolid,
		CirclePlusSolid,
		UsersSolid,
		ExclamationCircleSolid
	} from 'flowbite-svelte-icons';

	import { Card, Tooltip } from 'flowbite-svelte';

	import { onDestroy } from 'svelte';
	import toastStore from '$lib/stores/toastStore';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import DisplayCustomers from '$lib/components/customers/DisplayCustomers.svelte';

	message.subscribe((value) => {
		if (value) {
			toastStore.set({
				message: value,
				page: 'customers',
				show: true,
				type: 'error'
			});
		}
	});

	onDestroy(() => {
		toastStore.set({
			page: '#',
			show: false,
			message: '',
			type: 'success'
		});
	});
</script>

<div>
	{#if error}
		<DisplayError message="Error fetching customers data from the server.Please try again later" />
	{:else}
		<Card class="mx-auto my-4 flex max-w-6xl flex-row items-center justify-between">
			<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
				<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
					<UsersSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
				</span>
				<span> All the registered Pequrel customers </span>
			</p>

			<div>
				<a href="/dashboard/customers/new">
					<CirclePlusSolid />
				</a>

				<Tooltip>Add new customer</Tooltip>
			</div>
		</Card>
		{#if customers.length > 0}
			<DisplayCustomers {customers} {form} {enhance} {submitting} />
		{:else}
			<Card color="green" class="center mx-auto max-w-6xl">
				<p class="text-center">
					No A3S customers are registered yet click on the plus icon on the toolbar to register new
					customer
				</p>
			</Card>
		{/if}
	{/if}
</div>

{#if $toastStore.show && $toastStore.page === 'customers'}
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

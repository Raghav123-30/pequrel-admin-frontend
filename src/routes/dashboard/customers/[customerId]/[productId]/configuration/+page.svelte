<script lang="ts">
	export let data;
	const { error, configuration } = data;
	import DisplayConfiguration from '$lib/components/configuration/display/DisplayConfiguration.svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	console.log(configuration);
	import { EditSolid } from 'flowbite-svelte-icons';
	import { Tooltip, Toast, Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import toastStore from '$lib/stores/toastStore.js';
	import DisplayApi from '$lib/components/iot/DisplayApi.svelte';
	const customerId = $page.params.customerId;
	const productId = $page.params.productId;
</script>

{#if error}
	<DisplayError message="Failed to load configuration" />
{:else}
	<div class="mx-auto max-w-6xl p-8">
		<div>
			<Card class="mx-auto max-w-6xl">
				<h5 class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					API Docs(GET)
				</h5>
				<p class="mb-4 text-base">
					"Use this API to obtain configuration data. It makes a GET request to the backend, using
					the provided `customerId` and `productId` as search parameters, to retrieve the
					configuration data specific to the product owned by the customer."
				</p>
				<DisplayApi
					api={`https://pequrel-backend.raghavendrabhat.in/api/customers/configuration?customerId=${customerId}&productId=${productId}`}
				/>
			</Card>
		</div>
		<div class="my-8 flex justify-end">
			<a
				class="p-2 hover:bg-white/50"
				href={`/dashboard/customers/${$page.params.customerId}/${$page.params.productId}/configuration/edit`}
			>
				<EditSolid class="h-8 w-8" color="gray" />
				<Tooltip>Edit configuration</Tooltip>
			</a>
		</div>
		<DisplayConfiguration {configuration} />
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
{/if}

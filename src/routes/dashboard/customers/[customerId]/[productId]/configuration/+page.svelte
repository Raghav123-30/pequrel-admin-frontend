<script lang="ts">
	export let data;
	const { error, configuration } = data;
	import DisplayConfiguration from '$lib/components/configuration/display/DisplayConfiguration.svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	console.log(configuration);
	import { EditSolid } from 'flowbite-svelte-icons';
	import { Tooltip, Toast } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import toastStore from '$lib/stores/toastStore.js';
</script>

{#if error}
	<DisplayError message="Failed to load configuration" />
{:else}
	<div class="mx-auto max-w-6xl p-8">
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

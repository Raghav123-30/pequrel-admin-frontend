<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { products, error } = data;
	import { Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	const { form, enhance, submitting } = superForm(data.form, {
		applyAction: true,
		invalidateAll: 'force',
		onResult: ({ result }) => {
			if (result.type == 'failure') {
				toastStore.set({
					message: 'Failed to delete product',
					page: 'products',
					show: true,
					type: 'error'
				});
			} else if (result.type == 'success') {
				showModal = false;
				toastStore.set({
					message: 'Deleted product successfully',
					page: 'products',
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
		RocketSolid,
		CirclePlusSolid,
		EditSolid,
		TrashBinSolid,
		ExclamationCircleOutline
	} from 'flowbite-svelte-icons';

	import {
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Button,
		Tooltip,
		Modal
	} from 'flowbite-svelte';

	let searchTerm = '';

	let showModal = false;

	$: filteredProducts = products.filter(
		(product) => product.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	import { onDestroy } from 'svelte';
	import toastStore from '$lib/stores/toastStore';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';

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
		<DisplayError message="Error fetching products from the server.Please try again later" />
	{:else}
		<Card class="mx-auto my-4 flex max-w-6xl flex-row items-center justify-between">
			<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
				<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
					<RocketSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
					<span class="sr-only">Light bulb</span>
				</span>
				<span> All the registered A3S products </span>
			</p>

			<div>
				<a href="/dashboard/products/new">
					<CirclePlusSolid />
				</a>

				<Tooltip>Add new product</Tooltip>
			</div>
		</Card>
		{#if products.length > 0}
			<div class="px-8 py-20">
				<div class="mx-auto max-w-6xl">
					<Table>
						<TableSearch
							placeholder="Search by product name"
							hoverable={true}
							bind:inputValue={searchTerm}
						/>
						<TableHead>
							<!--				<TableHeadCell>ID</TableHeadCell>-->
							<TableHeadCell>Name</TableHeadCell>
							<TableHeadCell>Number of customers</TableHeadCell>
							<TableHeadCell>Type</TableHeadCell>
							<TableHeadCell>No of layers</TableHeadCell>
							<TableHeadCell>No of racks</TableHeadCell>
							<TableHeadCell>No of trays</TableHeadCell>
							<TableHeadCell>Product area</TableHeadCell>
							<TableHeadCell>Drying area</TableHeadCell>
							<TableHeadCell>Actions</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each filteredProducts as product}
								<TableBodyRow>
									<!--						<TableBodyCell>{product.productId}</TableBodyCell>-->
									<TableBodyCell>
										{product.productName}
									</TableBodyCell>
									<TableBodyCell>{product.numCustomers ? product.numCustomers : 0}</TableBodyCell>
									<TableBodyCell
										>{product.productType === 0 ? 'Drying' : 'Drying+Growing'}</TableBodyCell
									>
									<TableBodyCell>{product.numLayers}</TableBodyCell>
									<TableBodyCell>{product.numRacks}</TableBodyCell>
									<TableHeadCell>{product.numTrays}</TableHeadCell>
									<TableHeadCell>{product.productArea}</TableHeadCell>
									<TableHeadCell>{product.dryingArea}</TableHeadCell>
									<TableHeadCell>
										<div class="flex gap-2">
											<button class="p-2 hover:bg-white/50">
												<a href={`/dashboard/products/${product.productId}/edit`}>
													<EditSolid />
													<Tooltip>Edit product details</Tooltip>
												</a>
											</button>

											<button
												class="p-2 hover:bg-white/50"
												on:click={() => {
													showModal = true;

													form.set({ productId: product.productId || 'ERROR' });
												}}
											>
												<TrashBinSolid />
												<Tooltip>Delete product</Tooltip>
											</button>
										</div>
									</TableHeadCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</div>
		{:else}
			<Card color="green" class="center mx-auto max-w-6xl">
				<p class="text-center">
					No A3S products are added yet click on the plus icon on the toolbar to add new product
				</p>
			</Card>
		{/if}
		<Modal title="Are you absolutely sure?" bind:open={showModal} size="xs">
			<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this product?
			</h3>

			<form method="POST" action="?/delete" use:enhance>
				<!-- productId is set right when modal is enabled, I am setting input like this to resolve known superforms bug -->
				<input name="productId" bind:value={$form.productId} class="hidden" />
				<Button color="red" class="me-2" disabled={$submitting} type="submit">
					{#if $submitting}
						deleting ...
					{:else}
						Yes, I'm sure
					{/if}
				</Button>
			</form>

			<Button color="alternative" on:click={() => (showModal = false)}>No, cancel</Button>
		</Modal>
	{/if}
</div>

{#if $toastStore.show && $toastStore.page === 'products'}
	<div class="fixed bottom-10 right-10">
		<Toast color="green">
			<svelte:fragment slot="icon">
				<CheckCircleSolid class="h-5 w-5" />
				<span class="sr-only">Check icon</span>
			</svelte:fragment>
			{$toastStore.message}
		</Toast>
	</div>
{/if}

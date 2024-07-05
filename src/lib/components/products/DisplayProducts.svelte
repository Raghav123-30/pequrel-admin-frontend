<script lang="ts">
	import type { Product } from '$lib/models/product';
	export let products: Product[];
	export let form;
	export let submitting;
	export let enhance;
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tooltip,
		TableSearch,
		Modal,
		Button
	} from 'flowbite-svelte';
	import { EditSolid, TrashBinSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	let searchTerm = '';
	let productToBeDeleted = '';
	let showModal = false;

	$: filteredProducts = products.filter(
		(product) => product.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	submitting.subscribe((value: boolean) => {
		if (value) {
			showModal = false;
		}
	});
</script>

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
						<TableBodyCell>{product.productType === 0 ? 'Drying' : 'Drying+Growing'}</TableBodyCell>
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
										productToBeDeleted = product.productName;
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

<Modal title="Are you absolutely sure?" bind:open={showModal} size="xs">
	<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
	<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
		Are you sure you want to delete this product? <span class="font-bold">{productToBeDeleted}</span
		>
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

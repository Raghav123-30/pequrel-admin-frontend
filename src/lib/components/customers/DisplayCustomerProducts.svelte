<script lang="ts">
	import type { Customer } from '$lib/models/customer';
	import type { Product } from '$lib/models/product';
	export let productsData: Product[];
	export let customerData: Customer;
	export let form;
	export let errors;
	export let enhance;
	export let submitting;

	const customerProducts = productsData.filter((product) =>
		customerData.productIds?.includes(product.productId!)
	);

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tooltip,
		Card,
		Modal,
		Button,
		Select
	} from 'flowbite-svelte';
	import {
		RocketSolid,
		CirclePlusSolid,
		ExclamationCircleOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';
	let showAddProductModal = false;
	let showDeleteProductModal = false;
	let productToDelete = '';

	const productSelectionList = productsData
		.map((product) => {
			return {
				name: product.productName,
				value: product.productId
			};
		})
		.filter((item) => !customerData.productIds!.includes(item.value!));
	submitting.subscribe((value: boolean) => {
		if (value) {
			showAddProductModal = false;
			showDeleteProductModal = false;
		}
	});
</script>

<Card class="mx-auto max-w-6xl px-4">
	<Card class=" mx-auto my-4 flex max-w-6xl flex-row items-center justify-between gap-10">
		<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
			<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
				<RocketSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
				<span class="sr-only">Light bulb</span>
			</span>
			<span>
				Displays all the products purchased by {customerData.customerName}. You can add new product
				or remove the existing ones.
			</span>
		</p>

		<div>
			<button on:click={() => (showAddProductModal = true)}>
				<CirclePlusSolid />
			</button>

			<Tooltip>Add new product for Mr/Ms {customerData.customerName}</Tooltip>
		</div>
	</Card>
	<div>
		{#if customerProducts.length}
			<Table>
				<TableHead>
					<!--				<TableHeadCell>ID</TableHeadCell>-->
					<TableHeadCell>Name</TableHeadCell>

					<TableHeadCell>Type</TableHeadCell>
					<TableHeadCell>No of layers</TableHeadCell>
					<TableHeadCell>No of racks</TableHeadCell>
					<TableHeadCell>No of trays</TableHeadCell>
					<TableHeadCell>Product area</TableHeadCell>
					<TableHeadCell>Drying area</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each customerProducts as product}
						<TableBodyRow>
							<TableBodyCell>
								{product.productName}
							</TableBodyCell>

							<TableBodyCell
								>{product.productType === 0 ? 'Drying' : 'Drying+Growing'}</TableBodyCell
							>
							<TableBodyCell>{product.numLayers}</TableBodyCell>
							<TableBodyCell>{product.numRacks}</TableBodyCell>
							<TableHeadCell>{product.numTrays}</TableHeadCell>
							<TableHeadCell>{product.productArea}</TableHeadCell>
							<TableHeadCell>{product.dryingArea}</TableHeadCell>
							<TableHeadCell>
								<button
									on:click={() => {
										productToDelete = product.productName;
										$form.productId = product.productId;
										showDeleteProductModal = true;
									}}
								>
									<TrashBinSolid />
								</button>
								<Tooltip>Delete this product</Tooltip>
							</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<Card color="green" class=" mx-auto max-w-6xl">
				<p class="text-center">
					No A3S products are added yet for customer Ms/Mr {customerData.customerName}. Click on the
					plus icon on the toolbar to add new product
				</p>
			</Card>
		{/if}
	</div>
</Card>

<div class="relative">
	<Modal title="Product selection" bind:open={showAddProductModal} size="xs">
		<form use:enhance method="POST" action="?/addProduct">
			<Select items={productSelectionList} name="productId" bind:value={$form.productId} />
			<div class="my-4">
				<Button disabled={!$form.productId} type="submit">Confirm</Button>
				<Button color="alternative" on:click={() => (showAddProductModal = false)}>Cancel</Button>
			</div>
		</form>
	</Modal>
</div>

<div class="relative">
	<Modal title="Are you sure?" bind:open={showDeleteProductModal} size="xs">
		<div class="flex flex-col items-center justify-center">
			<ExclamationCircleOutline class="h-8 w-8" />
			<p>
				By clicking confirm. Product {productToDelete} will no longer be associated in the record of
				Mr/Ms {customerData.customerName}
			</p>
		</div>

		<form use:enhance method="POST" action="?/deleteProduct">
			<input name="productId" bind:value={$form.productId} class="hidden" />
			<!-- //will be hidden using it for sake of server action -->
			<div class="my-4">
				<Button type="submit" disabled={!$form.productId}>Confirm</Button>
				<Button color="alternative" on:click={() => (showDeleteProductModal = false)}>Cancel</Button
				>
			</div>
		</form>
	</Modal>
</div>

<script lang="ts">
	import {
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import type { Product } from '$lib/models/product';

	import { RocketSolid } from 'flowbite-svelte-icons';

	let searchTerm = '';
	export let products: Product[];
	$: filteredProducts = products.filter(
		(product) => product.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<div class="px-8 py-20">
	<Card class="mx-auto my-4 max-w-6xl">
		<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
			<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
				<RocketSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
				<span class="sr-only">Light bulb</span>
			</span>
			<span> All the registered A3S products </span>
		</p>
	</Card>
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
			</TableHead>
			<TableBody>
				{#each filteredProducts as product}
					<TableBodyRow>
						<!--						<TableBodyCell>{product.productId}</TableBodyCell>-->
						<TableBodyCell>
							<a
								href={`/dashboard/products/${product.productId}`}
								class="text-blue-500 hover:underline">{product.productName}</a
							>
						</TableBodyCell>
						<TableBodyCell>{product.numCustomers ? product.numCustomers : 0}</TableBodyCell>
						<TableBodyCell>{product.productType === 0 ? 'Drying' : 'Drying+Growing'}</TableBodyCell>
						<TableBodyCell>{product.numLayers}</TableBodyCell>
						<TableBodyCell>{product.numRacks}</TableBodyCell>
						<TableHeadCell>{product.numTrays}</TableHeadCell>
						<TableHeadCell>{product.productArea}</TableHeadCell>
						<TableHeadCell>{product.dryingArea}</TableHeadCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

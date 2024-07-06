<script lang="ts">
	import type { Customer } from '$lib/models/customer';
	import type { Product } from '$lib/models/product';
	export let allProducts: Product[];
	export let customer: Customer;

	const customerProducts = allProducts.filter((product) =>
		customer.productIds?.includes(product.productId!)
	);

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tooltip,
		Card
	} from 'flowbite-svelte';
</script>

<Card class="mx-auto max-w-6xl">
	<div>
		<div>
			<p class="my-8 text-center font-semibold leading-tight text-gray-700 dark:text-gray-400">
				All the products purchased by {customer.customerName}. You can add new product or remove the
				existing ones.
			</p>

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
				</TableHead>
				<TableBody>
					{#each customerProducts as product}
						<TableBodyRow>
							<!--						<TableBodyCell>{product.productId}</TableBodyCell>-->
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
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</Card>

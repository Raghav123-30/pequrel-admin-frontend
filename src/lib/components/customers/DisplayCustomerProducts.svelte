<script lang="ts">
	import type { Customer } from '$lib/models/customer';
	import type { Product } from '$lib/models/product';
	export let productsData: Product[];
	export let customerData: Customer;
	export let form;
	export let errors;
	export let enhance;
	export let submitting;
	export let customerProductForm;
	export let customerProductFormErrors;
	export let customerProductFormEnhance;
	export let customerProductFormSubmitting;
	import { Country, State, City, type IState } from 'country-state-city';
	const customerProductIds = customerData.customerProducts.map((item) => item.productId);
	console.log(`customerProductIds : ${customerProductIds}`);

	console.log(`all products :- ${productsData}`);
	console.log(customerData);
	console.log(productsData);

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
		Select,
		Textarea,
		Helper,
		Label,
		Spinner
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
		.filter((item) => !customerProductIds!.includes(item.value!));
	submitting.subscribe((value: boolean) => {
		if (value) {
			showAddProductModal = false;
			showDeleteProductModal = false;
		}
	});
	const countries = Country.getAllCountries();
	const india = countries[100];
	const states = State.getStatesOfCountry(india.isoCode);
	let selectedState: IState;

	if ($form.setupState) {
		let currentState = states.find((state) => state.name === $form.setupState);
		if (currentState) {
			selectedState = currentState;
		}
	}

	$: formattedCities = City.getCitiesOfState(india.isoCode, selectedState?.isoCode)?.map((item) => {
		return {
			value: item.name,
			name: item.name
		};
	});

	const formattedStates = states.map((item) => {
		return {
			value: item.name,
			name: item.name
		};
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
		{#if customerData.customerProducts.length}
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
					<TableHeadCell>Setup state</TableHeadCell>
					<TableHeadCell>Setup city</TableHeadCell>
					<TableHeadCell>Setup address</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each customerData.customerProducts as product}
						<TableBodyRow>
							<TableBodyCell>
								{productsData.find((item) => item.productId == product.productId)?.productName}
							</TableBodyCell>

							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)?.productType ===
								0
									? 'Drying'
									: 'Drying+Growing'}</TableBodyCell
							>
							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)
									?.numLayers}</TableBodyCell
							>
							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)
									?.numRacks}</TableBodyCell
							>
							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)
									?.numTrays}</TableBodyCell
							>
							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)
									?.productArea}</TableBodyCell
							>
							<TableBodyCell
								>{productsData.find((item) => item.productId == product.productId)
									?.dryingArea}</TableBodyCell
							>
							<TableBodyCell>{product.setupState}</TableBodyCell>
							<TableBodyCell>{product.setupCity}</TableBodyCell>
							<TableBodyCell>{product.setupAddress}</TableBodyCell>
							<TableHeadCell>
								<button
									on:click={() => {
										productToDelete =
											productsData.find((item) => item.productId == product.productId)
												?.productName || '';
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
		{#if productSelectionList.length == 0}
			<div class="flex flex-col items-center justify-center">
				<ExclamationCircleOutline class="h-8 w-8" />
				<p>
					{customerData.customerName} owns all the A3S products
				</p>
			</div>
		{:else}
			<form use:customerProductFormEnhance method="POST" action="?/addProduct">
				<div class="space-y-4">
					<Label>Select a product</Label>
					<Select
						items={productSelectionList}
						name="productId"
						bind:value={$customerProductForm.productId}
					/>
					{#if $customerProductFormErrors.productId}
						<Helper color="red">
							{$customerProductFormErrors.productId}
						</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>State of the setup</Label>
					<Select
						placeholder="Choose state"
						items={formattedStates}
						bind:value={$customerProductForm.setupState}
						on:change={() => {
							$form.setupCity = '';
							let currentState = states.find(
								(state) => state.name === $customerProductForm.setupState
							);
							if (currentState) {
								selectedState = currentState;
							}
						}}
						name="setupState"
						color={$customerProductFormErrors.setupState && 'red'}
					/>
					{#if $customerProductFormErrors.setupState}
						<Helper color="red">{$customerProductFormErrors.setupState}</Helper>
					{/if}
				</div>
				<div class="space-y-4">
					<Label>City of the setup</Label>
					<Select
						placeholder="Choose city"
						disabled={!$customerProductForm.setupState}
						items={formattedCities}
						bind:value={$customerProductForm.setupCity}
						name="setupCity"
						color={$customerProductFormErrors.setupCity && 'red'}
					/>
					{#if $customerProductFormErrors.setupCity}
						<Helper color="red">{$customerProductFormErrors.setupCity}</Helper>
					{/if}
				</div>

				<div class="space-y-4">
					<Label>Setup Address</Label>
					<Textarea
						bind:value={$customerProductForm.setupAddress}
						name="setupAddress"
						color={$customerProductFormErrors.setupAddress && 'red'}
					/>
					{#if $customerProductFormErrors.setupAddress}
						<Helper color="red">{$customerProductFormErrors.setupAddress}</Helper>
					{/if}
				</div>
				<div class="my-4">
					<Button disabled={$customerProductFormSubmitting} type="submit">
						{#if $customerProductFormSubmitting}
							<Spinner class="me-3" size="4" color="white" /> processing ....
						{:else}
							Confirm
						{/if}
					</Button>
					<Button color="alternative" on:click={() => (showAddProductModal = false)}>Cancel</Button>
				</div>
			</form>
		{/if}
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
				<Button type="submit" disabled={!$form.productId}>
					{#if $submitting}
						<Spinner class="me-3" size="4" color="white" /> Processing ...
					{:else}
						Confirm
					{/if}
				</Button>
				<Button color="alternative" on:click={() => (showDeleteProductModal = false)}>Cancel</Button
				>
			</div>
		</form>
	</Modal>
</div>

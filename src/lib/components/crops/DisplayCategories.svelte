<script lang="ts">
	import type { CropCategory } from '$lib/models/cropCategory';
	export let categories: CropCategory[];
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
		Button,
		Card
	} from 'flowbite-svelte';
	import {
		EditSolid,
		TrashBinSolid,
		ExclamationCircleOutline,
		RocketSolid,
		CirclePlusSolid
	} from 'flowbite-svelte-icons';
	let searchTerm = '';
	let productToBeDeleted = '';
	let showModal = false;

	$: filteredCategories = categories.filter(
		(category) =>
			category.cropCategoryNameEnglish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	submitting.subscribe((value: boolean) => {
		if (value) {
			showModal = false;
		}
	});
</script>

<div class="px-8 py-20">
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
	{#if categories.length}
		<div class="mx-auto max-w-6xl">
			<Table>
				<TableSearch
					placeholder="Search by product name"
					hoverable={true}
					bind:inputValue={searchTerm}
				/>
				<TableHead>
					<!--				<TableHeadCell>ID</TableHeadCell>-->
					<TableHeadCell>Category Name(English)</TableHeadCell>
					<TableHeadCell>Category Name(Kannada)</TableHeadCell>
					<TableHeadCell>Category Name(Hindi)</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredCategories as category}
						<TableBodyRow>
							<!--						<TableBodyCell>{product.productId}</TableBodyCell>-->
							<TableBodyCell>
								{category.cropCategoryNameEnglish}
							</TableBodyCell>

							<TableHeadCell>{category.cropCategoryNameKannada}</TableHeadCell>
							<TableHeadCell>{category.cropCategoryNameHindi}</TableHeadCell>
							<TableHeadCell>
								<div class="flex gap-2">
									<button class="p-2 hover:bg-white/50">
										<a href={`/dashboard/crops/category/${category.cropCategoryId}/edit`}>
											<EditSolid />
											<Tooltip>Edit product details</Tooltip>
										</a>
									</button>

									<!-- <button
										class="p-2 hover:bg-white/50"
										on:click={() => {
											showModal = true;
											productToBeDeleted = product.productName;
											form.set({ productId: product.productId || 'ERROR' });
										}}
									>
										<TrashBinSolid />
										<Tooltip>Delete product</Tooltip>
									</button> -->
								</div>
							</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{:else}
		<Card color="green" class="center mx-auto max-w-6xl">
			<p class="text-center">
				No crop categories are added yet click on the plus icon on the toolbar to add new crop
				category
			</p>
		</Card>
	{/if}
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

<script lang="ts">
	import type { Crop } from '$lib/models/crop';
	import type { Customer } from '$lib/models/customer';
	import type { Product } from '$lib/models/product';
	export let cropsData: Crop[];
	export let customerData: Customer;
	export let form;
	export let errors;
	export let product: Product;
	export let enhance;
	export let submitting;

	const customerCropsIds = customerData.setupCrops?.map((item) => item.cropId);
	const customerCrops = cropsData.filter((crop) => customerCropsIds?.includes(crop.cropId!));

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
		Avatar
	} from 'flowbite-svelte';
	import {
		RocketSolid,
		CirclePlusSolid,
		ExclamationCircleOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';
	let showAddCropModal = false;
	let showDeleteCropModal = false;
	let cropToDelete = '';

	const cropSelectionList = cropsData
		.map((crop) => {
			return {
				name: crop.cropNameEnglish,
				value: crop.cropId
			};
		})
		.filter((item) => !customerCropsIds!.includes(item.value!));
	submitting.subscribe((value: boolean) => {
		if (value) {
			showAddCropModal = false;
			showDeleteCropModal = false;
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
				Displays all the crops for which {customerData.customerName} has received training to deploy
				them on their setup with the product {product.productName}
			</span>
		</p>

		<div>
			<button on:click={() => (showAddCropModal = true)}>
				<CirclePlusSolid />
			</button>

			<Tooltip
				>Add new crop for Mr/Ms {customerData.customerName} to product {product.productName}</Tooltip
			>
		</div>
	</Card>
	<div>
		{#if customerCrops.length}
			<Table>
				<TableHead>
					<!--				<TableHeadCell>ID</TableHeadCell>-->
					<TableHeadCell>Crop image</TableHeadCell>

					<TableHeadCell>Crop name</TableHeadCell>
					<TableHeadCell>Mode</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each customerCrops as crop}
						<TableBodyRow>
							<TableBodyCell>
								<Avatar src={crop.imgUrl}></Avatar>
							</TableBodyCell>
							<TableBodyCell>
								{crop.cropNameEnglish}
							</TableBodyCell>
							<TableBodyCell>
								{crop.mode}
							</TableBodyCell>

							<TableHeadCell>
								<button
									on:click={() => {
										cropToDelete = crop.cropNameEnglish;
										$form.cropId = crop.cropId;
										showDeleteCropModal = true;
									}}
								>
									<TrashBinSolid />
								</button>
								<Tooltip>Delete this crop</Tooltip>
							</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<Card color="green" class=" mx-auto max-w-6xl">
				<p class="text-center">
					No crops are added yet for customer Ms/Mr {customerData.customerName} for their product {product.productName}.
					Click on the plus icon on the toolbar to add new crop
				</p>
			</Card>
		{/if}
	</div>
</Card>

<div class="relative">
	<Modal title="Crop selection" bind:open={showAddCropModal} size="xs">
		{#if cropSelectionList.length == 0}
			<div class="flex flex-col items-center justify-center">
				<ExclamationCircleOutline class="h-8 w-8" />
				<p>
					{customerData.customerName} has received training to use all the crops in {product.productName}
				</p>
			</div>
		{:else}
			<form use:enhance method="POST" action="?/addCrop">
				<Select items={cropSelectionList} name="cropId" bind:value={$form.cropId} />
				<div class="my-4">
					<Button disabled={!$form.cropId} type="submit">Confirm</Button>
					<Button color="alternative" on:click={() => (showAddCropModal = false)}>Cancel</Button>
				</div>
			</form>
		{/if}
	</Modal>
</div>

<div class="relative">
	<Modal title="Are you sure?" bind:open={showDeleteCropModal} size="xs">
		<div class="flex flex-col items-center justify-center">
			<ExclamationCircleOutline class="h-8 w-8" />
			<p>
				By clicking confirm. Crop {cropToDelete} will no longer be associated in the record of product
				{product.productName} owned by Mr/Ms {customerData.customerName}
			</p>
		</div>

		<form use:enhance method="POST" action="?/deleteCrop">
			<input name="cropId" bind:value={$form.cropId} class="hidden" />
			<!-- //will be hidden using it for sake of server action -->
			<div class="my-4">
				<Button type="submit" disabled={!$form.cropId}>Confirm</Button>
				<Button color="alternative" on:click={() => (showDeleteCropModal = false)}>Cancel</Button>
			</div>
		</form>
	</Modal>
</div>

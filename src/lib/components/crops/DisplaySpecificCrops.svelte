<script lang="ts">
	import type { Crop } from '$lib/models/crop';
	import type { CropCategory } from '$lib/models/cropCategory';
	export let specificCrops: Crop[];
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
		Card,
		Avatar
	} from 'flowbite-svelte';
	import {
		EditSolid,
		TrashBinSolid,
		ExclamationCircleOutline,
		RocketSolid,
		CirclePlusSolid
	} from 'flowbite-svelte-icons';
	let searchTerm = '';
	let specificCropToBeDeleted = '';
	let regionOfCrop = '';
	let showModal = false;
	let cropToBeViewed: Crop;
	let showCropModal = false;

	$: filteredspecificCrops = specificCrops.filter(
		(category) => category.cropNameEnglish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	submitting.subscribe((value: boolean) => {
		if (value) {
			showModal = false;
		}
	});
	const getCropCategoryName = (cropCategoryId: string) => {
		let categoryName = '';
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].cropCategoryId === cropCategoryId) {
				categoryName = categories[i].cropCategoryNameEnglish;
			}
		}
		return categoryName;
	};
</script>

<div class="px-8">
	<Card class="mx-auto my-4 flex max-w-6xl flex-row items-center justify-between">
		<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
			<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
				<RocketSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
				<span class="sr-only">Light bulb</span>
			</span>
			<span> All the registered crops(specific) </span>
		</p>

		<div>
			<a href="/dashboard/crops/new/specific">
				<CirclePlusSolid />
			</a>

			<Tooltip>Add new crop(specific)</Tooltip>
		</div>
	</Card>
	{#if specificCrops.length}
		<div class="mx-auto max-w-6xl">
			<Table>
				<TableSearch
					placeholder="Search by crop name"
					hoverable={true}
					bind:inputValue={searchTerm}
				/>
				<TableHead>
					<TableHeadCell>Crop Image</TableHeadCell>
					<!--				<TableHeadCell>ID</TableHeadCell>-->
					<TableHeadCell>Crop Name</TableHeadCell>
					<TableHeadCell>Region</TableHeadCell>
					<TableHeadCell>Mode</TableHeadCell>
					<TableHeadCell>Crop category</TableHeadCell>

					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredspecificCrops as crop}
						<TableBodyRow>
							<TableBodyCell>
								<button
									on:click={() => {
										cropToBeViewed = crop;
										showCropModal = true;
									}}
								>
									<Avatar size="md" src={crop.imgUrl} />
								</button>
							</TableBodyCell>
							<TableBodyCell>
								{crop.cropNameEnglish}
							</TableBodyCell>

							<TableBodyCell>{crop.city}</TableBodyCell>
							<TableBodyCell>{crop.mode}</TableBodyCell>
							<TableBodyCell>{getCropCategoryName(crop.cropCategoryId)}</TableBodyCell>

							<TableHeadCell>
								<div class="flex gap-2">
									<button class="p-2 hover:bg-white/50">
										<a href={`/dashboard/crops/${crop.cropId}/edit`}>
											<EditSolid />
											<Tooltip>Edit crop details</Tooltip>
										</a>
									</button>

									<button
										class="p-2 hover:bg-white/50"
										on:click={() => {
											showModal = true;
											specificCropToBeDeleted = crop.cropNameEnglish;
											regionOfCrop = crop.city;
											form.set({ cropId: crop.cropId || 'ERROR' });
										}}
									>
										<TrashBinSolid />
										<Tooltip>Delete crop</Tooltip>
									</button>
								</div>
							</TableHeadCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	{:else}
		<Card color="green" class=" mx-auto max-w-6xl">
			<p class="text-center">
				No default crops are added yet click on the plus icon on the toolbar to add new crop
			</p>
		</Card>
	{/if}
</div>

<Modal title="Are you absolutely sure?" bind:open={showModal} size="xs">
	<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
	<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
		Are you sure you want to delete this specific crop ? <span class="font-bold"
			>{specificCropToBeDeleted} from {regionOfCrop}</span
		>
	</h3>

	<form method="POST" action="?/deletespecificCrop" use:enhance>
		<!-- cropId is set right when modal is enabled, I am setting input like this to resolve known superforms bug -->
		<input name="cropId" bind:value={$form.cropId} class="hidden" />
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

<Modal bind:open={showCropModal} autoclose size="xs" on:on:close={() => (showCropModal = false)}>
	<div class="flex items-center justify-center">
		<img src={cropToBeViewed.imgUrl} alt="" />
	</div>
</Modal>

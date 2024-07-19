<script lang="ts">
	import type { Crop } from '$lib/models/crop';
	import type { CropCategory } from '$lib/models/cropCategory';

	import DisplayConfiguration from '../configuration/display/DisplayConfiguration.svelte';
	import { Card } from 'flowbite-svelte';

	export let crop: Crop;
	export let categories: CropCategory[];
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

<div class="mx-auto max-w-6xl p-8">
	<Card
		class="mx-auto my-8 flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row"
		color="navbarUl"
	>
		<div class="h-36 w-36">
			<img src={crop.imgUrl} alt="" />
		</div>
		<div class="flex flex-col items-start justify-center gap-2">
			<div class="flex gap-2 text-left">
				<h1 class="font-bold text-gray-500">Crop name :</h1>
				<p class=" text-gray-500">{crop.cropNameEnglish}</p>
			</div>
			<div class="flex">
				<h1 class="font-bold text-gray-500">Region :</h1>
				<p class=" text-gray-500">{crop.city == 'default' ? 'Default' : crop.city}</p>
			</div>
			<div class="flex">
				<h1 class="font-bold text-gray-500">Mode :</h1>
				<p class=" text-gray-500">{crop.mode}</p>
			</div>
			<div class="flex">
				<h1 class="font-bold text-gray-500">Crop category :</h1>
				<p class=" text-gray-500">{getCropCategoryName(crop.cropCategoryId)}</p>
			</div>
		</div>
	</Card>
	<DisplayConfiguration configuration={crop.configuration} />
</div>

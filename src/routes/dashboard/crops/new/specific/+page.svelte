<script lang="ts">
	export let data;
	import CropFullForm from '$lib/components/crops/forms/CropFullForm.svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import type { Crop } from '$lib/models/crop';
	const crop = {} as Crop;
	let { error, crops } = data;
	crops = crops.filter((item) => item.default == true); //get default crops
</script>

{#if error}
	<DisplayError message="Failed to load default crops please try again later" />
{:else}
	<CropFullForm
		isEditing={false}
		isDefault={false}
		{data}
		cropCategories={data.cropCategories}
		{crop}
		{crops}
	/>
{/if}

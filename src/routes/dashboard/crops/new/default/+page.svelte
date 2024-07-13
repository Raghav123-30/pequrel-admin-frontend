<script lang="ts">
	export let data;
	import CropFullForm from '$lib/components/crops/forms/CropFullForm.svelte';
	import type { Crop } from '$lib/models/crop';
	const crop = {} as Crop;
</script>

<CropFullForm
	isEditing={false}
	isDefault={true}
	{data}
	cropCategories={data.cropCategories}
	{crop}
/>

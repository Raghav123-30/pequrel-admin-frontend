<script lang="ts">
	import CropDetail from '$lib/components/crops/CropDetail.svelte';
	export let data;
	const { crop, cropCategories } = data;
</script>

<div>
	<CropDetail {crop} categories={cropCategories} />
</div>

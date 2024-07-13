<script lang="ts">
	import CropFullForm from '$lib/components/crops/forms/CropFullForm.svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';

	export let data;
	const { crop, error } = data;
</script>

{#if error}
	<DisplayError message="That crop does not exist" />
{:else}
	<CropFullForm isEditing={true} {data} cropCategories={data.cropCategories} {crop} />
{/if}

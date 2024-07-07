<script lang="ts">
	export let data;
	const { error, configuration } = data;
	import DisplayConfiguration from '$lib/components/configuration/display/DisplayConfiguration.svelte';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	console.log(configuration);
</script>

{#if error}
	<DisplayError message="Failed to load configuration" />
{:else}
	<div class="mx-auto max-w-6xl p-8">
		<DisplayConfiguration {configuration} />
	</div>
{/if}

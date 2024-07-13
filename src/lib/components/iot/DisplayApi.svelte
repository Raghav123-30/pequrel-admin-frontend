<script lang="ts">
	export let api: string;

	import { Card, Tooltip } from 'flowbite-svelte';
	import { ClipboardSolid, ClipboardCheckSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let tooltipText = 'copy to clipboard';
	let showCheckedIcon = writable(false);

	function copyToClipboard() {
		navigator.clipboard
			.writeText(api)
			.then(() => {
				showCheckedIcon.set(true);
				tooltipText = 'copied to clipboard';
				setTimeout(() => {
					showCheckedIcon.set(false);
					tooltipText = 'copy to clipboard';
				}, 3000);
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	}
</script>

<Card color="gray" class="max-w-6xl justify-between bg-slate-600 font-thin text-yellow-200">
	<div class="flex flex-col justify-between gap-4 p-2 md:flex-row">
		<p class="cliptext overflow-hidden break-words text-justify">{api}</p>
		<button on:click={copyToClipboard}>
			{#if $showCheckedIcon}
				<ClipboardCheckSolid />
			{:else}
				<ClipboardSolid />
			{/if}
		</button>
		<Tooltip>{tooltipText}</Tooltip>
	</div>
</Card>

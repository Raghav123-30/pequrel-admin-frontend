<script>
	import '../app.css';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import { navigating } from '$app/stores';
	import { Spinner } from 'flowbite-svelte';
</script>

<Navbar />
{#if $navigating}
	<div class="center">
		<Spinner color="blue" class=" mx-auto h-24 w-24 " />
	</div>
{:else}
	<slot></slot>
{/if}

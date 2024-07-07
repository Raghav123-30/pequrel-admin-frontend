<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	onMount(() => {
		goto('/dashboard');
	});
</script>

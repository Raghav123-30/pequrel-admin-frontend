<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		goto(`/dashboard/customers/${$page.params.customerId}/${$page.params.productId}/configuration`);
	});
</script>

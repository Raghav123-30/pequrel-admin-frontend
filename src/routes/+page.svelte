<script lang="ts">
	import type { PageServerData } from './$types';
	import { Button } from 'flowbite-svelte';
	export let data: PageServerData;
</script>

<div>
	<h1>{data.name}</h1>
	<Button>click me</Button>
</div>

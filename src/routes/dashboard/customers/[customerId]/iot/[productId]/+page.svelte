<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../$types';
	export let data: PageData;
	const { customerData } = data;
	console.log(customerData);
</script>

<div>
	iot data will be displayed here {$page.params.productId}
</div>

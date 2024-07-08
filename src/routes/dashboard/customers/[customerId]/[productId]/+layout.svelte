<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { StoreSolid, SunSolid, LightbulbSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	const productId = $page.params.productId;
	const customerId = $page.params.customerId;
</script>

<div class="mx-auto max-w-6xl p-8">
	<Card class="mx-auto max-w-6xl ">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Sections
		</h5>

		<div
			class={`flex items-center gap-2 hover:text-red-500 ${$page.url.pathname.includes('configuration') && 'font-bold text-red-500'}`}
		>
			<StoreSolid />
			<a href={`/dashboard/customers/${customerId}/${productId}/configuration`}>Configuration</a>
		</div>
		<div
			class={`flex items-center gap-2 hover:text-red-500 ${$page.url.pathname.includes('dht') && 'font-bold text-red-500'}`}
		>
			<SunSolid></SunSolid>
			<a href={`/dashboard/customers/${customerId}/${productId}/dht`}>Dht</a>
		</div>
		<div
			class={`flex items-center gap-2 hover:text-red-500 ${$page.url.pathname.includes('energy-meter') && 'font-bold text-red-500'}`}
		>
			<LightbulbSolid></LightbulbSolid>
			<a href={`/dashboard/customers/${customerId}/${productId}/energy-meter`}>Energymeter</a>
		</div>
	</Card>
</div>
<slot></slot>

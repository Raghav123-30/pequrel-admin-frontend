<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import DisplayApi from '$lib/components/iot/DisplayApi.svelte';
	import { page } from '$app/stores';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	import VisualizeEnergyMeterData from '$lib/components/charts/VisualizeEnergyMeterData.svelte';
	export let data;
	const { error, energyMeterData } = data;
	const customerId = $page.params.customerId;
	const productId = $page.params.productId;
</script>

{#if error}
	<DisplayError message="Something went wrong" />
{:else}
	<div class="mx-auto max-w-6xl px-8">
		<Card class="mx-auto max-w-6xl">
			<h5 class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				API Docs(GET)
			</h5>
			<p class="mb-4 text-base">
				Use this API to publish energy meter data from your controller to the database. It makes a
				GET request to the backend, using the provided <code>customerId</code>,
				<code>productId</code>,
				<code>voltage</code>, <code>current</code>, <code>power</code>, and <code>energy</code> as
				search parameters, to log the sensor data for a particular timestamp. Replace
				<code>{'{}'}</code>
				with actual values.
			</p>
			<DisplayApi
				api={`https://pequrel-backend.raghavendrabhat.in/api/energy-meter?customerId=${customerId}&productId=${productId}&voltage={}&current={}&power={}&energy={}`}
			/>
		</Card>
		<VisualizeEnergyMeterData {energyMeterData} />
	</div>
{/if}

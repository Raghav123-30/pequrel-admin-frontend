<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import DisplayApi from '$lib/components/iot/DisplayApi.svelte';
	import { page } from '$app/stores';
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	const customerId = $page.params.customerId;
	const productId = $page.params.productId;
</script>

<div class="mx-auto max-w-6xl px-8">
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			API Docs(GET)
		</h5>
		<p class="mb-4 text-base">
			Use this API to publish sensor data from your controller to the database. It makes a GET
			request to the backend, using the provided <code>customerId</code>, <code>productId</code>,
			<code>temperature</code>, <code>humidity</code>, and <code>sensorId</code> as search
			parameters, to log the sensor data for a particular timestamp. Replace <code>{'{}'}</code>
			with actual values.
		</p>
		<DisplayApi
			api={`https://pequrel-backend.raghavendrabhat.in/api/dht?customerId=${customerId}&productId=${productId}&temperature={}&humidity={}&sensorId={}`}
		/>
	</Card>
</div>

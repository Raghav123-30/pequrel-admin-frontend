<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	export let customerId;
</script>

<div>
	<Card class="mx-auto max-w-6xl space-y-4">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			IOT section
		</h5>

		<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
			The IoT section lets you visualize sensor data and energy meter data coming from the
			customer’s setup via graphs and also lets you download them. In addition to that, it lets you
			view the current configuration and notifications regarding the same about configuration
			updates. It also lets you list all the products owned by the customer along with allowing you
			to add new products or remove existing ones. Furthermore, it lets you get the API
			documentation you need for embedded programming.
		</p>

		<a href={`/dashboard/customers/${customerId}/iot`}>
			<Button class="w-fit">Go</Button>
		</a>
	</Card>
</div>

<script lang="ts">
	//import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { Dht } from '$lib/models/dht';
	import DhtChart from '$lib/components/charts/DhtChart.svelte';
	export let dhtData: Dht[];
	import { Datepicker } from 'flowbite-svelte';
	import { getTodayDateRange } from '../utils/getTodayDateRange';
	import { Button, Card, Input, Label } from 'flowbite-svelte';
	import { CalendarMonthSolid } from 'flowbite-svelte-icons';
	let [start, end] = getTodayDateRange();
	const onDateSelected = () => {
		console.log(start, end);
	};

	let format = 'dddd, MMMM D, YYYY';
</script>

<div class="my-6 flex justify-between gap-6">
	<div class="flex items-center justify-center md:justify-between">
		<Button on:click={onDateSelected}>Go</Button>
	</div>
</div>
<DhtChart sensorId="1" dhtData={dhtData.filter((item) => item.sensorId === 1)} />
<DhtChart sensorId="2" dhtData={dhtData.filter((item) => item.sensorId === 2)} />
<DhtChart sensorId="3" dhtData={dhtData.filter((item) => item.sensorId === 3)} />
<DhtChart sensorId="4" dhtData={dhtData.filter((item) => item.sensorId === 4)} />

<script lang="ts">
	import type { Dht } from '$lib/models/dht';
	import DhtChart from '$lib/components/charts/DhtChart.svelte';
	export let dhtData: Dht[];
</script>

<div class="my-6 flex flex-col gap-6">
	<DhtChart sensorId="1" dhtData={dhtData.filter((item) => item.sensorId === 1)} />
	<DhtChart sensorId="2" dhtData={dhtData.filter((item) => item.sensorId === 2)} />
	<DhtChart sensorId="3" dhtData={dhtData.filter((item) => item.sensorId === 3)} />
	<DhtChart sensorId="4" dhtData={dhtData.filter((item) => item.sensorId === 4)} />
</div>

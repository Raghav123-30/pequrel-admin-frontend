<script lang="ts">
	import type { Dht } from '$lib/models/dht';
	import EnergyChart from './EnergyChart.svelte';
	import VoltageChart from './VoltageChart.svelte';
	import CurrentChart from './CurrentChart.svelte';
	import PowerChart from './PowerChart.svelte';
	import type { EnergyMeter } from '$lib/models/energyMeter';
	export let energyMeterData: EnergyMeter[];
	let currentData = energyMeterData.map((item) => {
		return {
			current: item.current,
			timestamp: item.timestamp
		};
	});
	let voltageData = energyMeterData.map((item) => {
		return {
			voltage: item.voltage,
			timestamp: item.timestamp
		};
	});
	let powerData = energyMeterData.map((item) => {
		return {
			power: item.power,
			timestamp: item.timestamp
		};
	});
	let energyData = energyMeterData.map((item) => {
		return {
			energy: item.energy,
			timestamp: item.timestamp
		};
	});
</script>

<div class="my-6 flex flex-col gap-6">
	<CurrentChart {currentData} />
	<VoltageChart {voltageData} />
	<PowerChart {powerData} />
	<EnergyChart {energyData} />
</div>

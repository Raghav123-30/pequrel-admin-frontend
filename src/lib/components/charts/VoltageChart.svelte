<script>
	// @ts-nocheck

	import { Chart, Card } from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { format } from 'date-fns';

	// Sample Dht data
	export let voltageData = [];

	// Extracting data for the chart
	let timestamps = voltageData.map((entry) => {
		let time = new Date(entry.timestamp);
		return format(time, 'dd MMM HH:mm');
	});
	let voltages = voltageData.map((entry) => entry.voltage);

	let options = {
		chart: {
			height: '400px',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: true,
				tools: {
					zoom: true,
					zoomin: true,
					zoomout: true,
					pan: true,
					reset: true
				}
			}
		},
		tooltip: {
			enabled: true,
			x: {
				format: 'dd MMM yyyy HH:mm:ss'
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth',
			width: 2
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				type: 'vertical',
				shadeIntensity: 0.5,
				gradientToColors: ['#FFA07A', '#87CEFA'],
				inverseColors: false,
				opacityFrom: 0.7,
				opacityTo: 0.1
			}
		},
		series: [
			{
				name: 'voltage',
				data: voltages,
				color: '#FF5733'
			}
		],
		xaxis: {
			categories: timestamps,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: [
			{
				title: {
					text: 'voltage (V)',
					style: {
						color: '#FF5733'
					}
				},
				labels: {
					style: {
						color: '#FF5733'
					}
				}
			}
		]
	};
</script>

<Card class="mx-auto max-w-6xl px-8">
	<div class="flex justify-between">
		<div>
			<h5 class="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
				voltage vs time
			</h5>
		</div>
		<div
			class="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500"
		>
			<ChevronRightOutline class="ms-1 h-6 w-6" />
		</div>
	</div>
	<Chart {options} />
</Card>

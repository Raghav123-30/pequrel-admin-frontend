<script>
	// @ts-nocheck

	import { Chart, Card } from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';

	// Sample Dht data
	let dhtData = [
		{ dhtId: '1', temperature: 22.5, humidity: 55, timestamp: new Date('2023-02-01T12:00:00Z') },
		{ dhtId: '2', temperature: 23.1, humidity: 57, timestamp: new Date('2023-02-02T12:00:00Z') },
		{ dhtId: '3', temperature: 21.9, humidity: 53, timestamp: new Date('2023-02-03T12:00:00Z') },
		{ dhtId: '4', temperature: 22.8, humidity: 56, timestamp: new Date('2023-02-04T12:00:00Z') },
		{ dhtId: '5', temperature: 23.4, humidity: 58, timestamp: new Date('2023-02-05T12:00:00Z') },
		{ dhtId: '6', temperature: 22.0, humidity: 54, timestamp: new Date('2023-02-06T12:00:00Z') }
	];

	// Extracting data for the chart
	let timestamps = dhtData.map((entry) =>
		entry.timestamp.toISOString().replace('T', ' ').replace('Z', '')
	);
	let temperatures = dhtData.map((entry) => entry.temperature);
	let humidities = dhtData.map((entry) => entry.humidity);

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
				name: 'Temperature',
				data: temperatures,
				color: '#FF5733'
			},
			{
				name: 'Humidity',
				data: humidities,
				color: '#33C3FF'
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
					text: 'Temperature (°C)',
					style: {
						color: '#FF5733'
					}
				},
				labels: {
					style: {
						color: '#FF5733'
					}
				}
			},
			{
				opposite: true,
				title: {
					text: 'Humidity (%)',
					style: {
						color: '#33C3FF'
					}
				},
				labels: {
					style: {
						color: '#33C3FF'
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
				DHT Sensor Data(Dummy)
			</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">Temperature and Humidity</p>
		</div>
		<div
			class="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500"
		>
			<ChevronRightOutline class="ms-1 h-6 w-6" />
		</div>
	</div>
	<Chart {options} />
</Card>

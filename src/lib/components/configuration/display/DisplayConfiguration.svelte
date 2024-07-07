<script lang="ts">
	import type { Configuration } from '$lib/models/configuration';

	export let configuration: Configuration;
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Card
	} from 'flowbite-svelte';
</script>

<div class="flex flex-col gap-8">
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Ceiling Exhaust Configuration
		</h5>
		<Table>
			<TableHead>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>Temperature(°C)</TableHeadCell>
				<TableHeadCell>On for</TableHeadCell>
				<TableHeadCell>Off for</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>High</TableBodyCell>
					<TableBodyCell>{configuration.ceilingHighTemp}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingHighOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingHighOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Med</TableBodyCell>
					<TableBodyCell>{configuration.ceilingMedTemp}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingMedOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingMedOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Low</TableBodyCell>
					<TableBodyCell>{configuration.ceilingLowTemp}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingLowOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.ceilingLowOffFor}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</Card>
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Top Exhaust Configuration
		</h5>
		<Table>
			<TableHead>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>Temperature(°C)</TableHeadCell>
				<TableHeadCell>On for</TableHeadCell>
				<TableHeadCell>Off for</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>High</TableBodyCell>
					<TableBodyCell>{configuration.topHighTemp}</TableBodyCell>
					<TableBodyCell>{configuration.topHighOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.topHighOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Med</TableBodyCell>
					<TableBodyCell>{configuration.topMedTemp}</TableBodyCell>
					<TableBodyCell>{configuration.topMedOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.topMedOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Low</TableBodyCell>
					<TableBodyCell>{configuration.topLowTemp}</TableBodyCell>
					<TableBodyCell>{configuration.topLowOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.topLowOffFor}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</Card>
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Bottom Exhaust Configuration
		</h5>
		<Table>
			<TableHead>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>Humidity(%)</TableHeadCell>
				<TableHeadCell>On for</TableHeadCell>
				<TableHeadCell>Off for</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>High</TableBodyCell>
					<TableBodyCell>{configuration.bottomHighHumid}</TableBodyCell>
					<TableBodyCell>{configuration.bottomHighOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.bottomHighOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Med</TableBodyCell>
					<TableBodyCell>{configuration.bottomMedHumid}</TableBodyCell>
					<TableBodyCell>{configuration.bottomMedOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.bottomMedOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Low</TableBodyCell>
					<TableBodyCell>{configuration.bottomLowHumid}</TableBodyCell>
					<TableBodyCell>{configuration.bottomLowOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.bottomLowOffFor}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</Card>
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Horizontal airflow configuration
		</h5>
		<Table>
			<TableHead>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>Temperature(°C)</TableHeadCell>
				<TableHeadCell>On for</TableHeadCell>
				<TableHeadCell>Off for</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>High</TableBodyCell>
					<TableBodyCell>{configuration.horizontalHighTemp}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalHighOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalHighOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Med</TableBodyCell>
					<TableBodyCell>{configuration.horizontalMedTemp}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalMedOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalMedOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Low</TableBodyCell>
					<TableBodyCell>{configuration.horizontalLowTemp}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalLowOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.horizontalLowOffFor}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</Card>
	<Card class="mx-auto max-w-6xl">
		<h5 class="mb-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Heater1 Configuration
		</h5>
		<Table>
			<TableHead>
				<TableHeadCell>Mode</TableHeadCell>
				<TableHeadCell>Temperature(°C)</TableHeadCell>
				<TableHeadCell>On for</TableHeadCell>
				<TableHeadCell>Off for</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>High</TableBodyCell>
					<TableBodyCell>{configuration.heater1HighTemp}</TableBodyCell>
					<TableBodyCell>{configuration.heater1HighOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.heater1HighOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Med</TableBodyCell>
					<TableBodyCell>{configuration.heater1MedTemp}</TableBodyCell>
					<TableBodyCell>{configuration.heater1MedOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.heater1MedOffFor}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Low</TableBodyCell>
					<TableBodyCell>{configuration.heater1LowTemp}</TableBodyCell>
					<TableBodyCell>{configuration.heater1LowOnFor}</TableBodyCell>
					<TableBodyCell>{configuration.heater1LowOffFor}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</Card>
</div>

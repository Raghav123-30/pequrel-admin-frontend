<script lang="ts">
	import DisplayError from '$lib/components/utils/DisplayError.svelte';
	export let data;
	const { error, notifications } = data;
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

{#if error}
	<DisplayError message="Failed to load activity data" />
{:else}
	<div class="mx-auto max-w-6xl p-8">
		<Card class="mx-auto max-w-6xl">
			<Table>
				<TableHead>
					<TableHeadCell>Activity</TableHeadCell>
					<TableHeadCell>Time</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each notifications as notification}
						<TableBodyRow>
							<TableHeadCell tdClass="max-w-[400px]">{notification.message}</TableHeadCell>
							<TableHeadCell tdClass="text-right">
								{new Date(notification.modifiedAt).toLocaleString('en-Us', {
									timeZone: 'Asia/Kolkata'
								})}</TableHeadCell
							>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</Card>
	</div>
{/if}

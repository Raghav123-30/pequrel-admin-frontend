<script lang="ts">
	import type { Customer } from '$lib/models/customer';

	export let form;
	export let submitting;
	export let enhance;
	export let customers: Customer[];
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tooltip,
		TableSearch,
		Modal,
		Button
	} from 'flowbite-svelte';
	import { EditSolid, TrashBinSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	let searchTerm = '';
	let customerToBeDeleted = '';
	let showModal = false;

	$: filteredCustomers = customers.filter(
		(customer) => customer.customerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	submitting.subscribe((value: boolean) => {
		if (value) {
			showModal = false;
		}
	});
</script>

<div class="px-8 py-20">
	<div class="mx-auto max-w-6xl">
		<Table>
			<TableSearch
				placeholder="Search by customer name"
				hoverable={true}
				bind:inputValue={searchTerm}
			/>
			<TableHead>
				<TableHeadCell>Customer Name</TableHeadCell>
				<TableHeadCell>Customer Email</TableHeadCell>
				<TableHeadCell>Customer phone</TableHeadCell>
				<TableHeadCell>Customer address</TableHeadCell>

				<TableHeadCell>Actions</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each filteredCustomers as customer}
					<TableBodyRow>
						<!--						<TableBodyCell>{customer.customerId}</TableBodyCell>-->
						<TableBodyCell>
							<a
								href={`/dashboard/customers/${customer.customerId}`}
								class="text-blue-500 hover:underline">{customer.customerName}</a
							>
						</TableBodyCell>

						<TableBodyCell>{customer.customerEmail}</TableBodyCell>
						<TableBodyCell>{customer.customerPhone}</TableBodyCell>
						<TableHeadCell>{customer.customerAddress}</TableHeadCell>

						<TableHeadCell>
							<div class="flex gap-2">
								<button class="p-2 hover:bg-white/50">
									<a href={`/dashboard/customers/${customer.customerId}/edit`}>
										<EditSolid />
										<Tooltip>Edit customer details</Tooltip>
									</a>
								</button>

								<button
									class="p-2 hover:bg-white/50"
									on:click={() => {
										showModal = true;
										customerToBeDeleted = customer.customerName;
										form.set({ customerId: customer.customerId || 'ERROR' });
									}}
								>
									<TrashBinSolid />
									<Tooltip>Delete customer</Tooltip>
								</button>
							</div>
						</TableHeadCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

<Modal title="Are you absolutely sure?" bind:open={showModal} size="xs">
	<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
	<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
		Are you sure you want to delete this customer? <span class="font-bold"
			>{customerToBeDeleted}</span
		>
	</h3>

	<form method="POST" action="?/delete" use:enhance>
		<input name="customerId" bind:value={$form.customerId} class="hidden" />
		<Button color="red" class="me-2" disabled={$submitting} type="submit">
			{#if $submitting}
				deleting ...
			{:else}
				Yes, I'm sure
			{/if}
		</Button>
	</form>

	<Button color="alternative" on:click={() => (showModal = false)}>No, cancel</Button>
</Modal>

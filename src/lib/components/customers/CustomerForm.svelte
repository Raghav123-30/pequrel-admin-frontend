<script lang="ts">
	export let form;
	export let errors;

	import { Label, Input, Helper } from 'flowbite-svelte';
</script>

<div class="space-y-4">
	<Label>Customer Name</Label>
	<Input
		bind:value={$form.customerName}
		name="customerName"
		color={$errors.customerName && 'red'}
	/>
	{#if $errors.customerName}
		<Helper color="red">{$errors.customerName}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Email</Label>
	<Input
		type="email"
		bind:value={$form.customerEmail}
		name="customerEmail"
		color={$errors.customerEmail && 'red'}
	/>
	{#if $errors.customerEmail}
		<Helper color="red">{$errors.customerEmail}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Phone</Label>
	<Input
		bind:value={$form.customerPhone}
		name="customerPhone"
		color={$errors.customerPhone && 'red'}
	/>
	{#if $errors.customerPhone}
		<Helper color="red">{$errors.customerPhone}</Helper>
	{/if}
</div>

<div class="space-y-4">
	<Label>Customer Address</Label>
	<Input
		bind:value={$form.customerAddress}
		name="customerAddress"
		color={$errors.customerAddress && 'red'}
	/>
	{#if $errors.customerAddress}
		<Helper color="red">{$errors.customerAddress}</Helper>
	{/if}
</div>

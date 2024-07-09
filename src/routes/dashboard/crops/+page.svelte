<script lang="ts">
	import toastStore from '$lib/stores/toastStore';
	import { Toast } from 'flowbite-svelte';
	import { ExclamationCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import DisplayCategories from '$lib/components/crops/DisplayCategories.svelte';
	import { superForm } from 'sveltekit-superforms';
	export let data;
	const { allCropCategories } = data;
	const { form: categoryForm, enhance, errors, submitting } = superForm(data.categoryForm);
</script>

<div>
	<DisplayCategories categories={allCropCategories} form={categoryForm} {enhance} {submitting} />
</div>

{#if $toastStore.show && $toastStore.page === 'crops'}
	<div class="fixed bottom-10 right-10">
		<Toast color={$toastStore.type == 'error' ? 'red' : 'green'}>
			<div class="flex items-center gap-4">
				{#if $toastStore.type == 'error'}
					<ExclamationCircleSolid color="red" />
				{:else}
					<CheckCircleSolid color="green" />
				{/if}

				{$toastStore.message}
			</div>
		</Toast>
	</div>
{/if}

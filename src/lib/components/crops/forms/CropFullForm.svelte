<script lang="ts">
	import { Card, Button, Progressbar, Fileupload, Helper } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import toastStore from '$lib/stores/toastStore';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cropDataSchema } from '$lib/schemas/cropDataSchema';
	import { z } from 'zod';
	let input: HTMLInputElement;

	let image: HTMLImageElement | undefined;
	import { PUBLIC_S3_BUCKET_URL } from '$env/static/public';

	let showImage = false;

	import { uploadData } from 'aws-amplify/storage';

	import { cropSchema } from '$lib/schemas/cropSchema';
	import TopExhaustConfig from '$lib/components/configuration/forms/TopExhaustConfig.svelte';
	import CeilingConfig from '$lib/components/configuration/forms/CeilingConfig.svelte';
	import Heater1Config from '$lib/components/configuration/forms/Heater1Config.svelte';
	import BottomExhaustConfig from '$lib/components/configuration/forms/BottomExhaustConfig.svelte';
	import HorizontalAirflowConfig from '$lib/components/configuration/forms/HorizontalAirflowConfig.svelte';
	import { ceilingConfigSchema } from '$lib/schemas/ceilingConfigSchema';
	import { topExhaustConfigSchema } from '$lib/schemas/topExhaustConfigSchema';
	import { bottomExhaustConfigSchema } from '$lib/schemas/bottomExhaustConfigSchema';
	import { horizontalAirflowConfigSchema } from '$lib/schemas/horizontalAirFlowConfigSchema';
	import CropDataForm from '$lib/components/crops/forms/CropDataForm.svelte';

	import { PlusOutline, QuestionCircleSolid } from 'flowbite-svelte-icons';
	import { Amplify } from 'aws-amplify';
	import awsmobile from '../../../../aws-exports';
	import SuperDebug from 'sveltekit-superforms';
	import type { CropCategory } from '$lib/models/cropCategory';
	import { onMount } from 'svelte';
	import type { Crop } from '$lib/models/crop';
	export let crops: Crop[] = [];
	function uuidv4() {
		return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
			(+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
		);
	}

	function onChange() {
		const file = input.files;
		console.log(input.files);
		console.log(file);
		console.log(input);
		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				if (image) {
					image.setAttribute('src', reader.result as string);
				}
			});
			reader.readAsDataURL(file[0]);
		} else {
			if (isEditing) {
				showImage = true;
			} else {
				showImage = false;
			}
		}
	}
	export let data;
	export let isEditing: boolean;
	export let cropRegisterationErrorMessage = '';
	const { form, enhance, errors, submitting, message, validateForm } = superForm(data.form, {
		validators: zod(cropSchema),
		dataType: 'json',
		onSubmit: () => {
			cropRegisterationErrorMessage = '';
			console.log($form);
		},
		onResult: ({ result }) => {
			console.log(result);
			if (result.type === 'redirect') {
				toastStore.set({
					page: 'crops',
					message: isEditing ? 'Crop has been updated' : 'New crop has been added',
					show: true,
					type: 'success'
				});
			}
		}
	});
	message.subscribe((value) => {
		if (value && value != 'SUCCESS') {
			cropRegisterationErrorMessage = value;
		}
	});
	let isUploading = false;
	let isUploaded = false;
	const onUploadRequested = async () => {
		isUploading = true;
		Amplify.configure(awsmobile);
		try {
			if (input.files) {
				const fileName = `crops/${uuidv4()}`;
				const result = await uploadData({
					path: fileName,
					// Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
					data: input.files[0],
					options: {
						// onProgress // Optional progress callback.
					}
				}).result;
				console.log('Succeeded: ', result);
				isUploaded = true;
				$form.imgUrl = PUBLIC_S3_BUCKET_URL + '/' + fileName;
			} else {
				throw Error('Invalid file');
			}
			step += 1;
		} catch (error) {
			console.log('Error : ', error);
		}
		isUploading = false;
	};
	const checkIsNextForCropDataDisabled = async () => {
		const result = await validateForm({ schema: zod(cropDataSchema), update: true });

		return result.valid;
	};
	const checkIsNextForCeilingConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(ceilingConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForTopExhaustConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(topExhaustConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForBottomExhaustConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(bottomExhaustConfigSchema), update: true });

		return result.valid;
	};
	const checkIsNextForHorizontalConfigFormDisabled = async () => {
		const result = await validateForm({ schema: zod(horizontalAirflowConfigSchema), update: true });

		return result.valid;
	};

	export let cropCategories: CropCategory[];
	export let isDefault: boolean;
	const allCategoriesItems = cropCategories.map((item) => {
		return {
			name: item.cropCategoryNameEnglish,
			value: item.cropCategoryId
		};
	});
	export let crop: Crop;

	let step = 1;
	onMount(() => {
		if (isEditing) {
			const configurationData = crop.configuration;
			const cropRawData = { ...crop, ...configurationData };
			const { configuration, ...initialForm } = cropRawData;
			form.set(initialForm);
		}

		if (!isDefault) {
			$form.cropNameKannada = 'N/A';
			$form.cropNameHindi = 'N/A';
		}
	});
</script>

<div class="px-8 py-20">
	<div class="mx-auto my-8 max-w-6xl">
		<Progressbar progress={(step / 7) * 100} />
	</div>

	<Card class="mx-auto my-4 max-w-6xl">
		<form class="flex flex-col gap-4" method="POST" use:enhance>
			{#if step === 1}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide crop details
				</h5>
				<CropDataForm {isDefault} {form} {errors} {allCategoriesItems} {crops} />
				<div class="flex justify-end">
					<Button
						on:click={async () => {
							const valid = await checkIsNextForCropDataDisabled();
							if (valid) {
								if (isDefault) {
									step += 1;
								} else {
									step += 2;
								}
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 3}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide ceiling configuration details
				</h5>
				<CeilingConfig {form} {errors} />
				<div class="flex items-center justify-between">
					{#if !isDefault}
						<Button color="alternative" on:click={() => (step -= 2)}>Previous</Button>
					{:else if isEditing}
						<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					{:else}
						<Button color="alternative" on:click={() => window.location.reload()}>Reset</Button>
					{/if}
					<Button
						on:click={async () => {
							const valid = await checkIsNextForCeilingConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 4}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide top exhaust configuration details
				</h5>
				<TopExhaustConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForTopExhaustConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 5}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide bottom exhaust configuration details
				</h5>
				<BottomExhaustConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForBottomExhaustConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 6}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide horitzontal airflow configuration details
				</h5>
				<HorizontalAirflowConfig {form} {errors} />
				<div class="flex items-center justify-between">
					<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
					<Button
						on:click={async () => {
							const valid = await checkIsNextForHorizontalConfigFormDisabled();
							if (valid) {
								step += 1;
							}
						}}>Next</Button
					>
				</div>
			{:else if step == 7}
				<h5 class=" mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Provide heater 1 configuration details
				</h5>
				<input name="imgUrl" class="hidden" bind:value={$form.imgUrl} />
				<Heater1Config {form} {errors} />
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<Button color="alternative" on:click={() => (step -= 1)}>Previous</Button>
						<Button type="submit" disabled={$submitting}>
							{$submitting ? 'submitting' : 'submit'}
						</Button>
					</div>
					<div>
						{#if cropRegisterationErrorMessage}
							<Helper color="red">
								{cropRegisterationErrorMessage}
							</Helper>
						{/if}
					</div>
				</div>
			{:else if step == 2}
				<div class="flex flex-col items-center gap-5">
					<div
						class="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gray-100 hover:bg-fuchsia-100"
					>
						{#if showImage}
							{#if isUploading}
								Uploading......
							{:else if isEditing}
								<img src={$form.imgUrl} alt="" class="w-full rounded-full" />
							{:else}
								<img bind:this={image} src="" alt="Preview" class="w-full rounded-full" />
							{/if}
						{:else if isEditing}
							<img src={$form.imgUrl} alt="" class="w-full rounded-full" />
						{:else}
							<PlusOutline class="h-12 w-12" color="gray" />
						{/if}
					</div>
				</div>
				<div>
					<input
						type="file"
						accept="image/jpeg, image/png, image/jpg"
						bind:this={input}
						on:change={onChange}
					/>
					<Helper class="my-2"
						>PNG/JPG/JPEG {isEditing &&
							'Upload new image or click next to continue editing crop data and configuration'}</Helper
					>
				</div>
				<div class="flex justify-between">
					<Button
						color="alternative"
						on:click={() => window.location.reload()}
						disabled={isUploaded || isUploading}>Reset</Button
					>
					<div>
						<Button on:click={onUploadRequested} disabled={isUploading || !showImage}>
							{isUploading ? 'Uploading...' : 'Upload'}
						</Button>
						{#if isEditing}
							<Button on:click={() => (step += 1)}>Next</Button>
						{/if}
					</div>
				</div>
			{/if}
		</form>
	</Card>
</div>

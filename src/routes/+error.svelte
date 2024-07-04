<script lang="ts">
	import { Card, Label } from 'flowbite-svelte';
	import { ExclamationCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="center">
	<Card color="red" class="flex items-center gap-2 px-8 py-10">
		<ExclamationCircleSolid></ExclamationCircleSolid>
		<Label color="red">The resource you are looking for does not exist</Label>
	</Card>
</div>

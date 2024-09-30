<script lang="ts">
	import InsecureQuestions from '$lib/components/InsecureQuestions.svelte'
	import { marked } from 'marked'

	let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`

	let scoops = 1
	let flavors: any = []

	//$: console.log(selected)
</script>

<InsecureQuestions />

<!-- make a new card with a form element for selecting ice cream scoops and flavours.  Be sure to use the bind:group directive-->
<div class="card m-4 p-4 w-2/3 mx-auto">
	<h2>Ice Cream Selection</h2>
	<form>
		{#each [1, 2, 3] as number}
			<label class="label">
				<input class="radio m-2" type="radio" value={number} bind:group={scoops} />
				{number}
				{number === 1 ? 'scoop' : 'scoops'}</label>
		{/each}
		<!-- also allow flavor selections -->
		{#each ['Extreme Moose Tracks', 'Chocolate', 'Strawberry'] as flavor}
			<label class="label m-2">
				<input
					class="checkbox"
					type="checkbox"
					name="flavors"
					value={flavor}
					bind:group={flavors} />
				{flavor}
			</label>
		{/each}

		{#if flavors.length === 0}
			<p>Please select at least one flavour</p>
		{:else if flavors.length > scoops}
			<p>Can't order more flavours than scoops!</p>
		{:else}
			<p>
				You ordered {scoops}
				{scoops === 1 ? 'scoop' : 'scoops'}
				of {flavors}
			</p>
		{/if}

		<hr class="my-4" />
		<!-- Adding a select that allows multiple selections-->
		<select class="select w-1/3 text-center" multiple bind:value={flavors}>
			{#each ['cookies and cream', 'mint choc chip', 'rocky road', 'graham canyon'] as flavor}
				<option>{flavor}</option>
			{/each}
		</select>
	</form>
</div>

<div class="card m-4 p-4 w-2/3 mx-auto">
	<div class="grid grid-cols-[5rem_1fr] gap-4">
		input
		<textarea class="textarea resize-none" rows="5" bind:value></textarea>

		output
		<div>{@html marked(value)}</div>
	</div>
</div>

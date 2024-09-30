<script lang="ts">
	let wantSpam = false
	let selected: any
	let answer = ''

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is the mascot for SHS?`
		}
	]

	function handleSubmit() {
		alert(`You answered: ${answer} to the question: ${selected.text} with the id of ${selected.id}`)
	}
</script>

<div class="card m-4 p-4 w-2/3 mx-auto">
	<h2>Insecurity questions</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<input class="checkbox" type="checkbox" bind:checked={wantSpam} />
			Yes! Please send me all the spam!
		</label>

		<select class="select m-2" bind:value={selected} on:change={() => (answer = '')}>
			{#each questions as question}
				<option value={question}>{question.text}</option>
			{/each}
		</select>

		<input class="input" bind:value={answer} />
		<button class="btn variant-filled-primary mt-2" disabled={!answer} type="submit">Submit</button>
	</form>
    <div>
        {#if wantSpam}
            <p>Thank you for signing up for spam!</p>
        {:else}
            <p>You must opt in to continue. If you're not paying, you're the product.</p>
        {/if}
    </div>
</div>



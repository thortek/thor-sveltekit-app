<script lang="ts">
	let inputChat = ''

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event.preventDefault()
		const formData = new FormData(this)
		const message = formData.get('message') as string
		console.log(message)

        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const results = await response.json()
        console.log(results)
	}
</script>

<form class="flex flex-col gap-2 m-2 w-3/4 mx-auto" on:submit={handleSubmit}>
	<input class="input" type="text" name="message" bind:value={inputChat} />
	<button class="btn variant-filled-primary w-24" type="submit">Send</button>
</form>

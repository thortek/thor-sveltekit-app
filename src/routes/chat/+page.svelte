<script lang="ts">
    import { marked } from 'marked'
    import { chatHistoryStore } from '$lib/stores/chatHistoryStore'

	let answerText = ''

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event.preventDefault()
		const formData = new FormData(this)
		const message = formData.get('message') as string
		console.log(message)

        if (message == '') return

        // Update the chat history store with the user's message
        $chatHistoryStore = [...$chatHistoryStore, { role: 'user', content: message}]

        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ chats: $chatHistoryStore }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const results = await response.json()
        //console.log(results)
        answerText = results.message
	}
</script>

<form class="flex flex-col gap-2 m-2 w-3/4 mx-auto" on:submit={handleSubmit}>
	<input class="input" type="text" name="message" />
	<button class="btn variant-filled-primary w-24" type="submit">Send</button>

    <div>{@html marked(answerText)}</div>
</form>

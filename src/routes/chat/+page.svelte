<script lang="ts">
	import { marked } from 'marked'
	import { chatHistoryStore } from '$lib/stores/chatHistoryStore'
	import { readableStreamStore } from '$lib/stores/readableStreamStore'
	import TypingIndicator from '$lib/utils/typingIndicator.svelte'

	const response = readableStreamStore()

	let responseText = ''

	$: if ($response.text !== '') {
		;(async () => {
			responseText = await marked.parse($response.text)
		})() // Immediately invoke the async function to update the responseText (IIFE)
	}

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event.preventDefault()
		const formData = new FormData(this)
		const message = formData.get('message') as string
		console.log(message)

		if (message == '') return

		// Update the chat history store with the user's message
		$chatHistoryStore = [...$chatHistoryStore, { role: 'user', content: message }]

		try {
			const answer = response.request(
                new Request('/api/chat', {
				method: 'POST',
				body: JSON.stringify({ chats: $chatHistoryStore }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
            )

            this.reset()

            const answerText = (await answer) as string

            // Update the chat history store with the bot's response
            $chatHistoryStore = [...$chatHistoryStore, { role: 'assistant', content: answerText }]
            
		} catch (error) {
			console.error('Error:', error)
		}
	}
</script>

<form class="flex flex-col gap-2 m-2 w-3/4 mx-auto" on:submit={handleSubmit}>
	<input class="input" type="text" name="message" />
	<button class="btn variant-filled-primary w-24" type="submit">Send</button>

	<div>{@html marked(answerText)}</div>
</form>

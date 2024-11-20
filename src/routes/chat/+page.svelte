<script lang="ts">
	import { marked } from 'marked'
	import { chatHistoryStore } from '$lib/stores/chatHistoryStore'
	import { readableStreamStore } from '$lib/stores/readableStreamStore'
	import TypingIndicator from '$lib/utils/typingIndicator.svelte'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { fly } from 'svelte/transition'

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
			const markedText = await marked.parse(answerText)

			// Update the chat history store with the bot's response
			$chatHistoryStore = [...$chatHistoryStore, { role: 'assistant', content: markedText }]
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function deleteAllChats() {
		chatHistoryStore.set([])
	}
</script>

<main class="flex flex-col space-y-2 p-1">
	<form class="flex flex-col gap-2 m-2 w-3/4 mx-auto" on:submit={handleSubmit}>
		<div>
			{#await new Promise((resolve) => setTimeout(resolve, 400)) then _}
				<div class="flex group/chat hover:bg-gray-400 hover:rounded-lg">
					<Avatar class="h-12" src="/img-tutor-girl.png" alt="Tutor" width="w-12" />
					<div in:fly={{y: 50, duration: 1000}} class="assistant-chat">Hello! How can I help you today?</div>
				</div>
			{/await}
			{#each $chatHistoryStore as chat}
				{#if chat.role === 'user'}
					<div class="flex justify-end">
						<Avatar class="h-12 shrink-0" src="/PikaThorAnime.png" alt="Tutor" width="w-12" />
						<div in:fly={{y: 50, duration: 1000}} class="user-chat">{chat.content}</div>
					</div>
				{:else}
					<div class="flex justify-end">
						<Avatar class="h-12 shrink-0" src="/img-tutor-girl.png" alt="Tutor" width="w-12" />
						<div in:fly={{y: 50, duration: 1000}} class="assistant-chat">{@html chat.content}</div>
					</div>
				{/if}
				<!-- handle the case where chat.role === 'assistant'-->
			{/each}
			{#if $response.loading}
				{#await new Promise((resolve) => setTimeout(resolve, 400)) then _}
					<div class="flex">
						<Avatar class="h-12 shrink-0" src="/img-tutor-girl.png" alt="Tutor" width="w-12" />
						<div class="assistant-chat">
							{#if $response.text == ''}
								<TypingIndicator />
							{:else}
								{@html responseText}
							{/if}
						</div>
					</div>
				{/await}
			{/if}
		</div>
		<hr class="my-2" />
		<div class="flex flex-row space-x-4">
			<textarea class="textarea" name="message" rows="3" />
			<div class="flex flex-col justify-between">
				<button class="btn variant-filled-primary w-24" type="submit">Send</button>
				<button class="btn variant-filled-primary w-24" on:click={deleteAllChats}
					>Clear Chats</button>
			</div>

			<!-- <div>{@html marked(answerText)}</div> -->
		</div>
	</form>
</main>

<style lang="postcss">
	.assistant-chat {
		@apply bg-gray-200 text-gray-800 rounded-lg p-2;
	}

	.user-chat {
		@apply bg-slate-800 text-white rounded-lg p-2;
	}
</style>

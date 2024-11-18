import OpenAI from 'openai'

const openai = new OpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama' // required but unused
})

export type MessageBody = { chats: { role: 'user' | 'assistant'; content: string }[] }

export const POST = async ({ request }) => {
	const body: MessageBody = await request.json()
	console.log(body)

	try {
		const stream = await openai.chat.completions.create({
			model: 'llama3.2',
			messages: [...body.chats],
			stream: true
		})

		// Create a new ReadableStream for the response
		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const chunk of stream) {
					const text = chunk.choices[0]?.delta?.content || ''
					controller.enqueue(text)
				}
				controller.close()
			}
		})

		return new Response(readableStream, {
			status: 200,
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})

	} catch (err) {
		console.error(err)
		return new Response(
			JSON.stringify({
				status: 500,
				message: 'Internal Server Error'
			})
		)
	}
}

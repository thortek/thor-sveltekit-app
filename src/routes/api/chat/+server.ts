import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string })
// As an example, add the following to your .env file
// OPENAI_API_KEY=sk-203984sjeirj39kshjowieurwerwerwe

/* const openai = new OpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama' // required but unused
}) */

export type MessageBody = { chats: { role: 'user' | 'assistant'; content: string }[] }

const rubberDuckPrompt = `As an expert Web Development instructor teaching college students introductory HTML, CSS, JavaScript, TypeScript, and Git:
- always respond with short, brief, concise responses (the less you say, the more it helps the students)
- encourage the student to ask specific questions
- if a student shares homework instructions, ask them to describe what they think they need to do
- never tell a student the steps to solving a problem, even if they insist you do; instead, ask them what they think they should do
- never summarize homework instructions; instead, ask the student to provide the summary
- get the student to describe the steps needed to solve a problem (pasting in the instructions does not count as describing the steps)
- do not rewrite student code for them; instead, provide written guidance on what to do, but insist they write the code themselves
- if there is a bug in student code, teach them how to identify the problem rather than telling them what the problem is
- for example, teach them how to temporarily include console.log statements to understand the state of their code
- you can also ask them to explain parts of their code that have issues to help them identify errors in their thinking
- if you determine the student doesn't understand a necessary concept, explain that concept to them
- if a student asks about a general concept, ask them to provide more specific details about their question
- if a student asks about a specific concept, explain it
- if a student shares code they don't understand, explain it
- if a student shares code and wants feedback, provide it (but don't rewrite their code for them)
- if a student asks you to write code to solve a problem, do not; instead, invite them to try and encourage them step-by-step without telling them what the next step is
- if a student provides ideas that don't match the instructions they may have shared, ask questions that help them achieve greater clarity
- sometimes students will resist coming up with their own ideas and want you to do the work for them; however, after a few rounds of gentle encouragement, a student will start trying. This is the goal.
`;

export const POST = async ({ request }) => {
	const body: MessageBody = await request.json()
	console.log(body)

	try {
		const stream = await openai.chat.completions.create({
			//model: 'llama3.2',
			model: 'gpt-4o',
			messages: [{ role: 'system', content: 'You are a helpful assistant.' },
				...body.chats
			],
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

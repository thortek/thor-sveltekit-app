import OpenAI from 'openai'

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export type MessageBody = { chats: { role: 'user' | 'assistant', content: string }[]}

export const POST = async ( { request }) => {
    const body: MessageBody = await request.json();
    console.log(body);
   

    const completion = await openai.chat.completions.create({
        model: 'llama3.2',
        messages: [
            ...body.chats,
        ]
    })

    //console.log(completion.choices[0].message.content)


    return new Response(JSON.stringify(
        { 
            status: 200,
            message: completion.choices[0].message.content
        }
    ));
}
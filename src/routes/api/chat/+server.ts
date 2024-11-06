

export const POST = async ( { request }) => {
    const body = await request.json();
    console.log(body);
    const theMessage = body.message;
    return new Response(JSON.stringify(
        { 
            status: 200,
            message: theMessage
        }
    ));
}
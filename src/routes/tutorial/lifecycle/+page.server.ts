export function load({ params }) {
	//console.log('params: ', params);
    //console.log(process.env.MONGO_DB_URL);

	const myPost = {
        _id: '1',
        title: 'My first post',
        content: 'This is my first post',
    }

	return {
		myPost
	};
}
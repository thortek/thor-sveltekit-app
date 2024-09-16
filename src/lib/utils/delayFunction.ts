export async function getRandomNumber(): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Math.floor(Math.random() * 10000))
		}, 1000) // wait 2 seconds before resolving the promise and returning the random number
	})
}

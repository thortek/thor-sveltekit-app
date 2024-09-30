<script lang="ts">
	let myName = '<em>Thor</em>'

	export let answer: string = '42'
	export let message: string = 'Hello, world!'
</script>

<div class="flex flex-col mx-auto w-[500px] m-4 p-4 rounded-lg text-stone-500 bg-slate-300">
	<h1 class="text-center">Hello {@html myName.toUpperCase()}!</h1>
	<h1 class="text-center">The answer is {answer}!</h1>
	<h1 class="text-center">The message to you is {message}!</h1>
</div>

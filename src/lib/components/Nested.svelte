<script lang="ts">
	let myName = '<em>Thor</em>'

	export let answer: string = '42'
</script>

<h1 class="text-center">Hello {@html myName.toUpperCase()}!</h1>
<h1 class="text-center">The answer is {answer}!</h1>


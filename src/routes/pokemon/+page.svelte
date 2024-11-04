<script lang="ts">
	import { onMount } from 'svelte'

	let pokeDex: any[] = []

	onMount(async () => {
		const randomPokemonID = Math.floor(Math.random() * 900) + 1
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${randomPokemonID}&limit=25`)
		const data = await res.json()
		//console.log(data)
		pokeDex = data.results
	})
</script>

<main>
	<h1>PokeDex</h1>
	<div class="flex flex-wrap">
		{#each pokeDex as { name, url }}
        <div class="m-2 p-8 bg-secondary-800 rounded-lg">
			<a href={`/pokemon/${name}`} class="btn variant-filled-primary">
				<h2 class="text-2xl font-bold">{`${name[0].toUpperCase()}${name.slice(1)}`}</h2>
			</a>
        </div>
		{/each}
	</div>
</main>

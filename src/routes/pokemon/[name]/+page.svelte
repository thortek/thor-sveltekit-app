<script lang="ts">
	export let data

	//$: console.log(data)
</script>

<main class="flex flex-col">
	<h2 class="text-center text-4xl">#{data.pokemon.id} {data.pokemon.name}</h2>
	<img src={data.pokemon.image} alt={data.pokemon.name} class="mx-auto bg-slate-50 rounded-xl" />
	<h3 class="w-1/2 mx-auto truncate ...">Moves: {data.pokemon.moves.join(', ')}</h3>
	<!--     {#each data.pokemon.moves as move}
        <h3>{move}</h3>
    {/each} -->
	<div class="flex justify-between w-1/2 mx-auto">
		{#if data.pokemon.types[0]}
			<h1>Primary Type: {data.pokemon.types[0]}</h1>
		{/if}
		{#if data.pokemon.types[1]}
			<h1>Secondary Type: {data.pokemon.types[1]}</h1>
		{/if}
        {#if data.pokemon.types[2]}
			<h1>Tertiary Type: {data.pokemon.types[2]}</h1>
		{/if}
	</div>
</main>

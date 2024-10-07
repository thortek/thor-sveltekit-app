<script lang="ts">
	import { onMount } from 'svelte'
	import { starWarsCharacterStore } from '$lib/stores/starWarsCharacter';
	import { get } from 'svelte/store'

	//export let data:any

	let starWarsCharacter: { name: string; height: string; mass: string, id: string } = {
		name: '',
		height: '',
		mass: '',
        id: ''
	}

	onMount(() => {
		console.log('onMount')
		//console.log(data)
		getStarWarsCharacter()
		console.log(get(starWarsCharacterStore))
		return () => {
			console.log('onDestroy')
		}
	})

    // https://starwars-visualguide.com/assets/img/characters/1.jpg

	async function getStarWarsCharacter() {
		const randomCharacterId = Math.floor(Math.random() * 82) + 1
		const response = await fetch(`https://swapi.dev/api/people/${randomCharacterId}`)
		const data = await response.json()
		console.log(data)
		starWarsCharacter = {
            name: data.name,
            height: data.height,
            mass: data.mass,
            id: randomCharacterId.toString()
        }
		// check for duplicates here... not in the store subscribe method

		
		starWarsCharacterStore.update(characters => [...characters, starWarsCharacter])
	}
</script>

<h1>Lifecyle Route</h1>

<div class="flex flex-col items-center">
    <p>Star Wars Character</p>
    <p>{starWarsCharacter.name}</p>
    <p>{starWarsCharacter.height}</p>
    <p>{starWarsCharacter.mass}</p>
    <img src={`https://starwars-visualguide.com/assets/img/characters/${starWarsCharacter.id}.jpg`} alt="Star Wars Character" />
</div>

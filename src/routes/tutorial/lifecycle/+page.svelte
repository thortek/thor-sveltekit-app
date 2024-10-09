<script lang="ts">
	import { onMount } from 'svelte'
	import { starWarsCharacterStore } from '$lib/stores/starWarsCharacter'
	import { get } from 'svelte/store'
	import { fade } from 'svelte/transition'

	//export let data:any

	let starWarsCharacter: { name: string; height: string; mass: string; id: string } = {
		name: '',
		height: '',
		mass: '',
		id: ''
	}
	let loading = true

	onMount(() => {
		getStarWarsCharacter()

		/* 		return () => {
			console.log('onDestroy')
		} */
	})

	// https://starwars-visualguide.com/assets/img/characters/1.jpg

	async function getStarWarsCharacter() {
		const randomCharacterId = Math.floor(Math.random() * 82) + 1

		const currentStoreArray = get(starWarsCharacterStore)
		const duplicate = currentStoreArray.find(
			(character) => character.id === randomCharacterId.toString()
		)

		if (duplicate) {
			console.log(`duplicate character with id ${randomCharacterId} found`)
			starWarsCharacter = duplicate
			loading = false
			return
		} else {
			try {
				const response = await fetch(`https://swapi.dev/api/people/${randomCharacterId}`)
				const data = await response.json()
				console.log(data)
				starWarsCharacter = {
					name: data.name,
					height: data.height,
					mass: data.mass,
					id: randomCharacterId.toString()
				}
				starWarsCharacterStore.update((characters) => [...characters, starWarsCharacter])
				console.log(
					`new character with id ${randomCharacterId} and name ${starWarsCharacter.name} added`
				)
			} catch (error) {
				const randomCharacterFromStore =
					currentStoreArray[Math.floor(Math.random() * currentStoreArray.length)]
				starWarsCharacter = randomCharacterFromStore
				console.error(error)
			} finally {
				loading = false
			}
		}
	}
</script>

<h1>Lifecyle Route</h1>

{#if !loading}
<div class="flex flex-col items-center">
		<p>Star Wars Character</p>
		<p>{starWarsCharacter.name}</p>
		<p>{starWarsCharacter.height}</p>
		<p>{starWarsCharacter.mass}</p>
		<img
			src={`https://starwars-visualguide.com/assets/img/characters/${starWarsCharacter.id}.jpg`}
			alt="Star Wars Character" />
	</div>
{/if}

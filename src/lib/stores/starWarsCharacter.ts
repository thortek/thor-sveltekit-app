import { writable, type Writable } from 'svelte/store'
import { browser } from '$app/environment'

interface StarWarsCharacter {
	name: string
	height: string
	mass: string
	id: string
}

const initialValue = browser ? JSON.parse(localStorage.getItem('starWarsCharacters') || '[]') : []

export const starWarsCharacterStore: Writable<StarWarsCharacter[]> = writable(initialValue)

// Store the characters in local storage
starWarsCharacterStore.subscribe((value) => {
	//console.log('starWarsCharacterStore.subscribe:', value)
	if (browser) {
		localStorage.setItem('starWarsCharacters', JSON.stringify(value))
	}
})


/* starWarsCharacterStore.subscribe((value) => {

	try {
		// Create a Set to store unique IDs
		const uniqueIds = new Set<string>()
		const uniqueCharacters = value.filter((character) => {
			if (uniqueIds.has(character.id)) {
				console.log(`Duplicate character found: ${character.name}`)
				return false // Duplicate found, do not include in the filtered array
			} else {
				console.log(`Unique character found: ${character.name}`)
				uniqueIds.add(character.id)
				return true // Unique character, include in the filtered array
			}
		})

		// Update the store with the filtered array
		//starWarsCharacterStore.set(uniqueCharacters)
        
		if (browser) {
			localStorage.setItem('starWarsCharacter', JSON.stringify(uniqueCharacters))
		}
	} catch (error) {
		console.error('Error filtering characters:', error)
	}
}) */

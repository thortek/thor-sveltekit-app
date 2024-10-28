import { writable } from 'svelte/store'

// Create a writable store with the initial value of null
export const currentUser = writable<any>(null)
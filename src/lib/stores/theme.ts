import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const initialValue = browser ? localStorage.getItem('theme') || 'skeleton' : 'skeleton'

export const theme = writable(initialValue)

theme.subscribe(value => {
    //console.log('theme', value)
    if (browser) {
    document.body.dataset.theme = value // set the theme on the body
    localStorage.setItem('theme', value) // save the theme to local storage
    }
})
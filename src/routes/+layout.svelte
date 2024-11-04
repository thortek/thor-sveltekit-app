<script lang="ts">
	import '../app.postcss'
	import ThemeMenu from '$lib/components/ThemeMenu.svelte'

	// Highlight JS
	import hljs from 'highlight.js/lib/core'
	import 'highlight.js/styles/github-dark.css'
	import { storeHighlightJs } from '@skeletonlabs/skeleton'
	import xml from 'highlight.js/lib/languages/xml' // for HTML
	import css from 'highlight.js/lib/languages/css'
	import javascript from 'highlight.js/lib/languages/javascript'
	import typescript from 'highlight.js/lib/languages/typescript'
	import AuthButton from '$lib/components/AuthButton.svelte'

	// Handling authentication section
	import { currentUser } from '$lib/stores/currentUser'

	// Here is the data that is passed to the layout from the layout.server.ts load() function
	export let data

	console.log('layout data', data)

	currentUser.set(data?.userProfile)

	// Register languages

	hljs.registerLanguage('xml', xml) // for HTML
	hljs.registerLanguage('css', css)
	hljs.registerLanguage('javascript', javascript)
	hljs.registerLanguage('typescript', typescript)
	storeHighlightJs.set(hljs)

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<div class="flex justify-between w-full bg-primary-700">
	{#if $currentUser}
		<ul class="flex gap-4 text-2xl py-2">
			<li><a href="/tutorial/introduction">Introduction</a></li>
			<li><a href="/tutorial/reactivity">Reactivity</a></li>
			<li><a href="/tutorial/props">Props</a></li>
			<li><a href="/tutorial/logic">Logic</a></li>
			<li><a href="/tutorial/events">Events</a></li>
			<li><a href="/tutorial/bindings">Bindings</a></li>
			<li><a href="/tutorial/lifecycle">Lifecycle</a></li>
		</ul>
		<ThemeMenu />
		{:else}
		<div class="w-full text-center">
			<h1 class="text-4xl text-center">Login to enjoy my site!</h1>
		</div>
	{/if}
	<div class="flex">
		<AuthButton />
	</div>
</div>
<slot />

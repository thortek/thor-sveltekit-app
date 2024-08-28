<script lang="ts">
	import Nested from '$lib/components/Nested.svelte'

	let imgSrc = '/pexels-adria-masi-461420600-27372389.jpg'
</script>

<div class="flex flex-col m-4">

	<Nested answer={'Something else'}/>

<img src={imgSrc} class="mt-8" alt="A beautiful mountain scene"/>
</div>


<script lang="ts">
	import Nested from '$lib/components/Nested.svelte'
	import SportsCar from '$lib/components/SportsCar.svelte'

	const myCar = {
		make: 'Ford',
		model: 'Mustang',
		year: 2014,
		color: 'red'
	}
</script>

<h1 class="m-4">
	Props are a way to pass data from a parent component to a child component. In this example, we
	pass answer and message values via their respective props to the Nested component.
</h1>
<h1 class="m-4">
    We also pass all the properties of the myCar object to the SportsCar component using the spread
    operator.
</h1>

<Nested answer="Not 42" message="SvelteKit is awesome!" />

<SportsCar {...myCar} />

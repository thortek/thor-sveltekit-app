<script lang="ts">
import SportsCar from '$lib/components/SportsCar.svelte'

const myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 2014,
    color: 'red'
}
</script>

<h1>Props</h1>

<SportsCar {...myCar}/>


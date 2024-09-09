<script lang="ts">
	import { faker } from '@faker-js/faker'
    import { SlideToggle } from '@skeletonlabs/skeleton';

    let avatarsVisible = true

	//const twentyFiveAvatars = Array.from({ length: 25 }, () => faker.image.avatar())
    const twentyFiveAvatars = [...Array(25)].map(() => {
        const lastName = faker.person.lastName()
        return {
            name: lastName,
            avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${lastName}`
        }
    })

    // https://api.dicebear.com/9.x/adventurer/svg

    function showAvatars() {
        avatarsVisible === false ? avatarsVisible = true : avatarsVisible = false
    }

    async function retrievePokemon() {
        // generate a random number between 1 and 1302
        const randomPokemonId = Math.floor(Math.random() * 1302) + 1
        // wrap this in a try catch block because of 404 errors
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)
        const data = await response.json()
        console.log(data.sprites.other['official-artwork'].front_default)
    }
</script>

<h1 class="m-8">Logic</h1>

<SlideToggle class="bg-sky-600 pr-2" name="slide" bind:checked={avatarsVisible}>{avatarsVisible === false ? `Hide Avatars` : `Show Avatars`}</SlideToggle>

{#if !avatarsVisible}
    <div class="flex flex-wrap justify-center m-4">
        {#each twentyFiveAvatars as {name, avatar}}
        <div class="flex flex-col items-center m-4">
            <img class="w-24 h-24" src={avatar} alt={name} />
            <p class="text-blue-300 font-bold">{name}</p>
        </div>
        {/each}
    </div>
    {:else}
    <p>Avatars are hidden</p>
{/if}

<button class="btn btn-lg variant-filled-primary" on:click={retrievePokemon}>
    Retrieve Random Pokemon
</button>

<!-- {#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await} -->
<script lang="ts">
	import { faker } from '@faker-js/faker'

    let avatarsVisible = true

	const twentyFiveAvatars = Array.from({ length: 25 }, () => faker.image.avatar())

    function showAvatars() {
        avatarsVisible === false ? avatarsVisible = true : avatarsVisible = false
    }
</script>

<h1 class="m-8">Logic</h1>

<button class="btn btn-lg variant-filled-primary" on:click={showAvatars}>
    Generate 25 Avatars
</button>

{#if !avatarsVisible}
    <div class="m-8 grid grid-cols-5 gap-4">
        {#each twentyFiveAvatars as avatar}
            <img src={avatar} alt="avatar" />
        {/each}
    </div>
    {:else}
    <p>Avatars are hidden</p>
{/if}


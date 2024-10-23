<script lang="ts">
	import { tweened, spring } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { ProgressBar } from '@skeletonlabs/skeleton'
	import { fade, fly } from 'svelte/transition'
    import { flip } from 'svelte/animate'

	const progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	})

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	)

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8]

    const shuffle = () => {
        numbers = numbers.sort(() => Math.random() - 0.5)
    }

	let visible = true
	let size = spring(10)
</script>

<div class="flex flex-col gap-16 m-4">
	<div>
		<ProgressBar bind:value={$progress} max={100} meter="bg-red-400" track="bg-blue-500" />
		<button class="btn variant-filled" on:click={() => ($progress = 0)}>0$</button>
		<button class="btn variant-filled" on:click={() => ($progress = 25)}>25$</button>
	</div>

	<div class="flex gap-2">
		<div class="w-48 select-none">
			<label>
				<h3>stiffness ({coords.stiffness})</h3>
				<input bind:value={coords.stiffness} type="range" min="0.01" max="1" step="0.01" />
			</label>

			<label>
				<h3>damping ({coords.damping})</h3>
				<input bind:value={coords.damping} type="range" min="0.01" max="1" step="0.01" />
			</label>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<svg
			class="w-full h-48 border"
			on:mousemove={(e) => {
				const { left, top } = e.currentTarget.getBoundingClientRect()
				coords.set({ x: e.clientX - left, y: e.clientY - top })
			}}
			on:mousedown={() => size.set(30)}
			on:mouseup={() => size.set(10)}>
			<circle fill="#f00" cx={$coords.x} cy={$coords.y} r={$size} />
		</svg>
	</div>

    <div>
        <label>
            <input type="checkbox" bind:checked={visible} />
            Visible
        </label>
        <div class="flex gap-4">
            {#if visible}
            <img src="https://place.dog/300/200" alt="Dog" transition:fly={{ y: 400, duration: 1000 }} />
            <img src="/bizarro_squidward.png" alt="Bizarro Squidward" width="300" transition:fade />
            <img src="/greek_god_fight.png" alt="Greek fighting" width="300" in:fly={{ y: 200, duration: 2000}} out:fade />
            <div class="bg-red-400 w-24 h-24" transition:fade={{ duration: 1000 }}></div>
            {/if}
        </div>
    </div>

    <div>
        <button class="btn variant-filled" on:click={shuffle}>Shuffle</button>
        <ul>
            {#each numbers as number (number)}
            <li class="bg-yellow-800 w-36 rounded text-center my-1" animate:flip={{duration: 800}}>
                {number}
            </li>
            {/each}
    </div>
</div>

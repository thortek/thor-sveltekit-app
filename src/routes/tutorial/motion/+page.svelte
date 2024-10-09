<script lang="ts">
    import { tweened, spring } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'
    import { ProgressBar } from '@skeletonlabs/skeleton'

    const progress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    })

    let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});

	let size = spring(10);

</script>

<div class="flex flex-col gap-16 m-4">
    <div>
        <ProgressBar bind:value={$progress} max={100} meter="bg-red-400" track="bg-blue-500" /> 
        <button class="btn variant-filled" on:click={() => $progress = 0}>0$</button>
        <button class="btn variant-filled" on:click={() => $progress = 25}>25$</button>
        </div>


</div>


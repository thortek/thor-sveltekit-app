<script lang="ts">
    import Outer from "$lib/components/Outer.svelte";
    import BigBlueButton from "$lib/components/BigBlueButton.svelte";

let m = {x: 0, y: 0}
let isToggled = false

function handleMessage(event: CustomEvent) {
    alert(event.detail.text)
}

function handleClick() {
    isToggled = !isToggled
}

</script>

<h1>Events</h1>

<div class="w-96 h-32 border p-4" on:pointermove={(e) => {
    m = {x: Math.floor(e.clientX), y: Math.floor(e.clientY)}
}}>
	The pointer is at {m.x} x {m.y}
</div>

<button class="btn variant-filled-primary m-4" on:click|once={() => alert('Thanks for clicking this one time!')}>Click me once... and only once!</button>
<Outer on:message={handleMessage} />
<BigBlueButton on:click={handleClick} bgClass={isToggled ? 'bg-blue-500' : 'bg-red-500'}/> 
<script lang="ts">
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

function sayHello() {
    dispatch('message', {
        text: 'Hello! My name is Inigo Montoya. You killed my father. Prepare to die.'
    })
}

</script>

<button class="btn variant-filled-primary m-4" on:click={sayHello}>Click to say hello</button>
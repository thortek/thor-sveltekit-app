<script lang="ts">
    let count = 0
    let numbers = [1, 2, 3, 4, 5]

    $: if (count >= 10) {
        alert(`count is dangerously high! ${count}`)
        count = 9
    }

    function handleClick() {
        count += 1
    }

    function addNumber() {
        numbers = [...numbers, numbers.length + 1]
    }

    $: sum = numbers.reduce((a, n) => a + n, 0)
</script>

<button class="btn variant-filled-primary w-64 m-4" on:click={handleClick}>
    Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{numbers.join(' + ')} = {sum}</p>

<button class="btn variant-outline-primary" on:click={addNumber}>Add a number</button>
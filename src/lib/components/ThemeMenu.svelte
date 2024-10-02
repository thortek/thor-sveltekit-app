<script lang="ts">

    import { theme } from '$lib/stores/theme'

</script>

<div class="m-1">
    <select class="select" bind:value={$theme}>
        <option value="skeleton">Skeleton</option>
        <option value="wintry">Wintry</option>
        <option value="rocket">Rocket</option>
        <option value="vintage">Vintage</option>
        <option value="seafoam">Seafoam</option>
        <option value="crimson">Crimson</option>
    </select>
</div>
<script lang="ts">
import { currentUser } from '$lib/stores/currentUser';
</script>

<div class="h-screen flex flex-col items-center justify-center">
{#if $currentUser}
  <h1 class="text-4xl"> Welcome, {$currentUser.name}! </h1>
  <img src={$currentUser.picture} alt="avatar" class="rounded-full h-40 w-40 m-4"/>
  {/if}
</div>

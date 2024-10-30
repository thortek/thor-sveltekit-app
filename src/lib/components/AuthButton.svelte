<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser'
	import { goto } from '$app/navigation'
	import { Avatar } from '@skeletonlabs/skeleton'

	const handleLogout = () => {
		goto('/api/auth/logout')
	}

	const handleLogin = () => {
		goto('/api/auth/login')
	}
</script>

{#if $currentUser}
	<div class="flex items-center">
		<button class="btn bg-gray-800 m-1" on:click={handleLogout}>Logout</button>
		<div>
            <Avatar src={$currentUser.picture} alt="avatar" class="w-9 rounded-full" />
        </div>
	</div>
{:else}
	<button class="btn bg-gray-600 m-1" on:click={handleLogin}>Login</button>
{/if}

<script lang="ts">
	import { loggedIn } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import handleLogout from './hooks/auth/handleLogout';
	const dispatch = createEventDispatcher();
	export let blur = false;
	export let page = 'not index';
</script>

<nav class:blur>
	<a href="/" class="navitem left">Home</a>
	{#if page === 'index'}
		{#if !$loggedIn}
			<a href="/" class="navitem" on:click={() => dispatch('login')}>Log in</a>
			<a href="/" class="navitem" on:click={() => dispatch('signup')}>Sign up</a>
		{/if}
	{/if}
	{#if $loggedIn}
		<a href="/new-doc" class="navitem">Create new document</a>
		<a href="/library" class="navitem">Library</a>
		<a href="/" class="navitem" on:click={handleLogout}>Log out</a>
	{/if}
</nav>

<style lang="scss">
	nav {
		height: var(--nav-height);
		border-bottom: 0.125rem solid #67676732;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	.navitem {
		margin: 0 max(5vw, 5rem);
		color: black;
		letter-spacing: 0.15rem;
		text-decoration: none;
		font-family: 'Inter';
		border-color: transparent;
		font-size: clamp(1.15rem, 1.15vw, 1.5rem);
		position: relative;
		&::before {
			opacity: 0.05;
			transform: scale(0.001);
			content: '';
			position: absolute;
			transition: all 0.2s ease-in-out;
			z-index: -1;
			opacity: 0.75;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform-origin: center;
		}
		&:hover::before {
			opacity: 0.75;
			transition: all 0.1s ease-in-out;
			background-color: var(--offwhite);
			border-radius: 0.35rem;
			transform: scale(1.2);
		}
	}

	.left {
		justify-self: flex-start;
	}
</style>

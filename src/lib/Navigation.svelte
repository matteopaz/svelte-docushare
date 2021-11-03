<script lang="ts">
	import { loggedIn } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let blur = false;
</script>

<nav class:blur>
	<a href="/" class="navitem">Home</a>
	<a href="/" class="navitem">Create new document</a>
	{#if $loggedIn}
		<a href="/library.svelte" class="navitem">Library</a>
		<a href="/" class="navitem" on:click={() => dispatch('logout')}>Log out</a>
	{:else}
		<a href="/" class="navitem" on:click={() => dispatch('login')}>Log in</a>
		<a href="/" class="navitem" on:click={() => dispatch('signup')}>Sign up</a>
	{/if}
</nav>

<style lang="scss">
	nav {
		height: 4rem;
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
</style>

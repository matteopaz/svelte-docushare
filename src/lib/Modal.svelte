<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	const dispatch = createEventDispatcher();
	export let title = '';
	const dist = spring(60, { stiffness: 0.08, damping: 0.2 });
	onMount(() => {
		dist.set(5);
	});
</script>

<div class="wrapper" on:click={() => dispatch('close')}>
	<div class="modal" on:click|stopPropagation style="bottom: {$dist}vh">
		<h3 id="title">{title}</h3>
		<hr />
		<slot />
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
		display: grid;
		place-items: center;
	}

	hr {
        height: 1px;
		color: #67676732;
		background-color: #67676732;
		border-bottom: none;
		width: 90%;
		margin: 3% auto;
	}

	h3#title {
        all: unset;
        display: block;
        margin-top: 2rem;
        margin-bottom: 1rem;
		text-align: center;
		font-family: 'Montserrat Alternates', sans-serif;
		font-size: clamp(1.5rem, 2vw, 2.5rem);
		letter-spacing: 0.1rem;
	}

	.modal {
		opacity: 1;
		min-width: 50rem;
		max-width: 75rem;
		min-height: 50rem;
		background-color: var(--offwhite);
		color: black;
		z-index: 1;
		border-radius: 2rem;
		border: 1px solid #44444432;
		position: relative;
	}
</style>

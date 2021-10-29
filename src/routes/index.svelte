<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
	import Counter from '$lib/Counter.svelte';
	import src from '/svelte.png';
</script>

<Navigation />
<main>
	<section class="hero-container">
		<h1 class="hero">Svelte Docushare</h1>
		<h2 class="hero">Document sharing and editing platform - A SvelteKit Demo</h2>
		<div class="stripe" />
	</section>
</main>

<style lang="scss">
	:global(body) {
		background-color: #e5e5e5;
	}
	.stripe {
		width: 35rem;
		top: 0;
    margin-left: 25vw;
		height: 100rem;
		position: absolute;
		background-color: black;
		transform: skew(-55deg);
		z-index: -1;
	}

	.hero-container {
		position: relative;
		padding: 5rem;
		overflow: hidden;
    min-height: calc(100vh - 5.5rem);

	}

	.hero {
		--txt: 100, 100, 100;
		letter-spacing: 0.25rem;
		color: rgba(var(--txt), 0.33);
		font-family: 'Montserrat Alternates', sans-serif;
	}
	h1.hero {
		color: black;
		font-size: min(13.5vw, 14.5rem);
		font-weight: bold;
		width: min-content;
		float: left;
		margin-top: 0;
		margin-bottom: 0;
		background: var(--lin-grad-1);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	h2.hero {
		color: rgba(var(--txt), 0.75);
		letter-spacing: 0.15rem;
		margin: 0;
		text-align: left;
		padding-top: 2.5rem;
		font-size: clamp(1.25rem, 2vw, 2.25rem);
	}
</style>

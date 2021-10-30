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
		<div class="utilities-container">
			<div class="card">
			<ul class="statistics">
				<li>📰 Documents Created Overall:&nbsp;&nbsp;<em>10</em></li>
				<li>👀 Times Website Viewed:&nbsp;&nbsp;<em>10</em></li>

			</ul>
			</div>
			<div class="card doclist" />
		</div>
	</section>
</main>

<style lang="scss">
	:global(body) {
		background-color: #e5e5e5;
		font-family: 'Inter', sans-serif;
	}
	.stripe {
		width: 35rem;
		top: 0;
		margin-left: 25vw;
		position: absolute;
		background-color: #be60b7;
		transform: skew(-55deg);
		z-index: -1;
		height: 100vh;
		opacity: 0.4;
		background-image: linear-gradient(to bottom, var(--lin-grad-1));
		background-repeat: no-repeat;
	}
	.hero-container {
		position: relative;
		padding: 5rem;
		overflow: hidden;
		min-height: calc(100vh - 5rem);
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
		margin-right: 5rem;
		background: linear-gradient(to top right, var(--lin-grad-1));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	h2.hero {
		font-weight: normal;
		color: black;
		letter-spacing: 0.15rem;
		margin: 0;
		text-align: left;
		padding-top: 2.5rem;
		font-size: clamp(1.25rem, 2vw, 2.25rem);
	}
	.utilities-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: min(7vw, 8rem);
		padding: 7.5rem 2.5rem 0 2.5rem;
		height: 40rem;
		clear: both;
		place-items: center;
		@media (max-width: 800px) {
			grid-template-columns: unset;
			grid-template-rows: 1fr 1fr;
			height: 67.5rem;
		}
	}

	.card {
		background: #be60b744;
		box-shadow: 0 8px 32px 0 rgba(128, 65, 123, 0.267);
		backdrop-filter: blur(4px);
		border-radius: 1rem;
		border: 0.2rem solid #67676732;
		padding: 5%;
		height: 100%;
		width: 100%;
	}

	.statistics {
		list-style-type: none;
		margin: 0;
		padding: 0;
		height: 100%;
		display: flex;
		flex-flow: column wrap;
		align-items: space-around;
		gap: 5%;
		justify-content: space-around;
		li {
			height: 5rem;
		}
		em {
			font-size: 1.25em;
		}
	}
</style>

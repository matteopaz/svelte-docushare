<script lang="ts" context="module">
	// @ts-expect-error
	import { API_URL } from '/src/global.d';
	export async function load({ page, fetch }) {
		const hash = page.params.hash;
		const res: Response = await fetch(`${API_URL}/view/${hash}`);
		if (res.ok) {
			return {
				props: {
					content: await res.text()
				}
			};
		} else {
			return {
				props: {
					content: `# Hello world \n *Emphasized* ~~strikethrough~~ _italic_ **Bold**
					`
				}
			};
		}
	}
</script>

<script lang="ts">
	import 'gfm.css';
	import Navigation from '$lib/Navigation.svelte';
	import sanitizeHtml from 'sanitize-html';
	import { Remarkable } from 'remarkable';
	export let content: string;
	const md = new Remarkable({
		xhtmlOut: true,
		breaks: true
	});
	const renderedContent = md.render(content);
	const safeContent = sanitizeHtml(renderedContent);
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Arimo&display=swap" rel="stylesheet" />
</svelte:head>

<Navigation />
<section class="main-container">
	{@html safeContent}
</section>

<style lang="scss">
	.main-container {
		max-width: clamp(70rem, 50vw, 90rem);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		margin: 0 auto;
		background-color: var(--offwhite);
		min-height: var(--page-height);
		padding: clamp(3rem, 4vw, 4.5rem);
		font-family: 'Arimo', sans-serif;
		font-size: clamp(1.75rem, calc(28 * calc(100vw / 1920)), 2.75rem); // In px
	}
</style>

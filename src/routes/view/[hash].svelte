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
					content: "# Header *emphasis* ~~strikethrough~~"
				}
			};
		}
	}
</script>

<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
    import DOMPurify from 'dompurify';
    import { marked } from 'marked';
	import { onMount } from 'svelte';
	export let content: string;

    const renderedContent = marked.parse(content);
    const sanitizedContent = DOMPurify.sanitize(renderedContent);
    console.log(sanitizedContent);
</script>

<Navigation />
<section class="main-container">
{@html sanitizedContent}
</section>

<style lang="scss">
	.main-container {
		max-width: clamp(70rem, 50vw, 90rem);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		margin: 0 auto;
		background-color: var(--offwhite);
		min-height: var(--page-height);
		padding: clamp(3rem, 4vw, 4.5rem);
	}
</style>

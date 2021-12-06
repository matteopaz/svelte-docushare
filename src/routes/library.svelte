<script context="module" lang="ts">
	import { browser } from '$app/env';
	// @ts-expect-error
	import { API_URL } from '/src/global.d';
	export async function load({ fetch, session }) {
		console.log(JSON.stringify(fetch, session));
		if (fetch) {
			console.log('fetch exists');
		}
		if (session.loggedIn) {
			const fetched_documents = await fetch(`${API_URL}/user-docs/100`, {
				headers: {
					Authentication: session.jwt
				}
			});
			return {
				props: {
					documents: await fetched_documents.json()
				}
			};
		}
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { title } from '$lib/stores';
	import Navigation from '$lib/Navigation.svelte';
	import Doclist from '$lib/Doclist.svelte';
	export let documents = [];
	title.set('Library');
</script>

<Navigation />
<section class="main-container" class:center={!$session.loggedIn}>
	{#if $session.loggedIn}
		<h1>Your Documents - {$session.user}</h1>
		<hr />
		<Doclist {documents} spacing={1.5} denied={!$session.loggedIn} />
	{:else}
		<h1>Please <a href="/">Log in!</a></h1>
	{/if}
</section>

<style lang="scss">
	.main-container {
		max-width: max(80rem, 50vw);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		margin: 0 auto;
		background-color: var(--offwhite);
		min-height: var(--page-height);
		padding: clamp(3rem, 4vw, 4.5rem);
		&.center {
			display: grid;
			place-items: center;
			h1 {
				padding-bottom: 15rem;
			}
		}
	}

	h1 {
		margin: 0;
		text-align: center;
		font-family: 'Montserrat Alternates', sans-serif;
		font-size: clamp(2.75rem, 2vw, 3.5rem);
		a {
			text-decoration: underline;
			color: #3222ee;
		}
	}

	hr {
		margin-top: 3.25rem;
		margin-bottom: 3.25rem;
	}
</style>

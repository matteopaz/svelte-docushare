<script lang="ts">
	import { API_URL } from '/src/global.d';
	import checkAuth from '$lib/hooks/auth/checkAuth';
	import { loggedIn, user, jwt, title } from '$lib/stores';
	import Navigation from '$lib/Navigation.svelte';
	import Doclist from '$lib/Doclist.svelte';
	import { onMount } from 'svelte';
	let documents = [];
	title.set('Library');
	onMount(async () => {
		await checkAuth(jwt, loggedIn, user);
		if ($loggedIn) {
			const fetched_documents = await fetch(`${API_URL}/user-docs/100`, {
				headers: {
					Authorization: `Bearer ${$jwt}`
				}
			});
			documents = await fetched_documents.json();
		}
	});
</script>

<Navigation />
<section class="main-container" class:center={!$loggedIn}>
	{#if $loggedIn}
		<h1>Your Documents - {$user}</h1>
		<hr />
		<Doclist {documents} spacing={1.5} denied={!$loggedIn} />
	{:else if $loggedIn === false}
		<h1>Please <a href="/">Log in!</a></h1>
	{:else}
		<h1>Loading...</h1>
	{/if}
</section>

<style lang="scss">
	.main-container {
		max-width: max(60rem, 45vw);
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

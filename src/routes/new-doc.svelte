<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '/src/global.d';
	import { jwt, loggedIn, user, title } from '$lib/stores';
	import { goto } from '$app/navigation';
	title.set('Creating Doc...');
	let status = {
		text: 'Creating new document...',
		error: false
	};
	(async function newDoc() {
		const fetcher = await fetch(`${API_URL}/new-doc`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$jwt}`
			},
			body: JSON.stringify({
				title: 'Untitled Doc',
				user: $user
			})
		});
		if (fetcher.ok) {
			const res = await fetcher.json();
			setTimeout(() => {
				goto(`/edit/${res.__hash}`);
			}, 300);
		} else {
			let text =  'Error creating new document. Try logging back in or reloading.';
			if(fetcher.status === 405) {
				text = await fetcher.text();
			}
			console.error(fetcher.statusText);
			status = {
				text,
				error: true
			};
		}
	})();
</script>

<a href="/">Home</a>
<div class="wrapper">
	<h1 class:knockout={!status.error} class:error={status.error}>{status.text}</h1>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-flow: column nowrap;
		place-items: center;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-size: 5.5rem;
		margin-bottom: 15rem;
	}

	.error {
		color: red;
		font-size: 4rem;
		font-family: 'Montserrat Alternates', sans-serif;
		max-width: 90rem;
		line-height: 200%;
		text-align: center;
	}

	a {
		display: block;
		color: blue;
		width: max-content;
		margin: 3rem auto;
		margin-bottom: 0;
		letter-spacing: 0.065rem;
	}
</style>

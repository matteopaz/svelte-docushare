<script lang="ts">
	// For some reason, this one in particular throws an unignorable error - Ignore it it works.
	import { API_URL } from '/src/global.d';
	import { session } from '$app/stores';
	export let documents: { hash: string; title: string; owned: string; created: string }[];
	export let listlength = 999;
	export let spacing = 1;
	export let denied: Boolean = true;
	export let maxh = 10000;
	documents = documents.slice(0, listlength);
	let confirmstate = new Array(listlength).fill(false);
	async function handleDelete(hash, index) {
		documents.splice(index, 1);
		confirmstate.splice(index, 1);
		documents = documents;
		confirmstate = confirmstate;
		const data = await fetch(`${API_URL}/delete-doc/${hash}`, {
			method: 'DELETE',
			headers: {
				Authentication: $session.jwt
			}
		});
		if (!data.ok) {
			console.error(await data.text());
		} else {
			console.log('Deleted');
		}
	}
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/747d2e26f4.js" crossorigin="anonymous" defer></script>
</svelte:head>

<ol class="doclist" style="max-height: {maxh}rem">
	{#if !denied}
		{#if documents.length > 0}
			{#each documents as doc, index}
				{#if doc}
					<li style="padding-top: {spacing}rem; padding-bottom: {spacing}rem;">
						<a href="/edit/{doc.hash}" class="document-title">{doc.title}</a>
						<span class="statistic"
							><span class="small">Created: </span>{new Date(
								doc.created
							).toLocaleDateString()}</span
						>
						<span class="statistic"><span class="small">Owned: </span>{doc.owned}</span>
						<div class="delete">
							<button
								on:click={() => {
									confirmstate[index] = !confirmstate[index];
								}}
								aria-label="Delete"
								class:red={confirmstate[index]}
							>
								<i class="far fa-trash-alt delete" />
							</button>
							{#if confirmstate[index]}
								<div class="confirm">
									<button
										class="accept"
										on:click={() => {
											handleDelete(doc.hash, index);
										}}><i class="fas fa-check" /></button
									>
									<button
										class="deny"
										on:click={() => {
											confirmstate[index] = false;
										}}><i class="fas fa-times" /></button
									>
								</div>
							{/if}
						</div>
					</li>
				{/if}
			{/each}
		{:else}
			<li class="denied">Documents appear here. Make one!</li>
		{/if}
	{:else}
		<li class="denied">Please log in to access!</li>
	{/if}
</ol>

<style lang="scss">
	.doclist {
		overflow-y: auto;
		margin: 0;
		padding: 0;
		list-style-type: upper-roman;
		width: 90%;
		margin: 0 auto;
		overflow-x: visible;
		scrollbar-width: thin;
		scrollbar-color: #e5e5e5 #be60b744;

		&::-webkit-scrollbar {
			width: 16px;
		}

		&::-webkit-scrollbar-track {
			background-color: #be60b744;
			border-radius: 1rem;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #e5e5e5;
			border-radius: 1rem;
		}

		li {
			position: relative;
			display: grid;
			grid-template-columns: 8fr 6fr 7fr 1.5fr;
			grid-template-rows: 1;
			width: 100%;
			padding-left: 1.25rem;
			padding-right: 1.25rem;
		}
		li.denied {
			display: block;
			list-style-type: none;
			font-family: 'Montserrat Alternates', sans-serif;
			font-size: clamp(1.75rem, 1.25vw, 2.25rem);
			margin: 1rem auto;
			text-align: center;
		}
	}

	.red {
		opacity: 1;
		color: #b64a4a;
	}
	.confirm {
		.accept {
			color: #52a76e;
		}
		.deny {
			color: #b64a4a;
		}
		* {
			margin: 0 0.5rem;
		}
		padding: 0.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
		position: absolute;
		right: 0;
		transform: translate(-75%);
		background-color: var(--dark);
	}

	.delete {
		overflow: visible;
		display: grid;
		place-items: center;
		background-color: transparent;
		font-size: clamp(1rem, 1.15vw, 2rem);
		line-height: 0;
		margin-bottom: 0.25rem;
		button {
			margin: 0;
			padding: 0;
			width: min-content;
			background-color: transparent;
			border: none;
			transition: opacity 0.2s ease-in-out;
			cursor: pointer;
		}
		& > button {
			opacity: 0.6;
		}
		&:hover {
			opacity: 1;
		}
	}

	.statistic {
		color: #676767bb;
		font-family: 'Montserrat Alternates', sans-serif;
		margin: 0 0.5vw;
		font-size: clamp(1rem, 1.15vw, 1.5rem);
		.small {
			font-size: 0.8em;
			font-style: italic;
			padding-right: 0.45vw;
		}
	}

	.document-title {
		text-decoration: none;
		font-size: clamp(1rem, 1.15vw, 1.75rem);
		letter-spacing: 0.05rem;
		color: rgb(58, 47, 57);
	}
</style>

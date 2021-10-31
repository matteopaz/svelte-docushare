<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
	import caret from '/caret.svg';
	import { onMount } from 'svelte';
	import Modal from '$lib/Modal.svelte';
	import { loggedIn } from '$lib/stores';
	let loaded = false;
	let modalActive = {
		login: false,
		signup: false
	};
	let signup = {
		email: '',
		password: '',
	}
	let login = {
		email: '',
		password: '',
	}
	async function handleLogout() {
		return null;
	}
	const documents = Array(8).fill({
		title: 'The coodsaffffffffffoo asdf sadf sada fsdasf d',
		createdat: '2020-01-01',
		lastviewed: '2020-01-01'
	});
	onMount(() => {
		loaded = true;
	});
</script>

<Navigation
	on:signup={() => (modalActive.signup = true)}
	on:login={() => (modalActive.login = true)}
	on:logout={handleLogout}
	blur={modalActive.signup || modalActive.login}
/>
<main class:blur={modalActive.signup || modalActive.login}>
	<section class="hero-container">
		<h1 class="hero" class:unload={!loaded}>
			Svelte <br /> Docushare <img src={caret} alt="Caret" class="caret" />
		</h1>
		<h2 class="hero">Document sharing and editing platform - A SvelteKit Demo</h2>
		<div class="stripe" class:unload={!loaded} />
		<div class="utilities-container">
			<div class="card panel">
				<h3>User Panel</h3>
				<hr />
				<ol class="doclist">
					{#if !$loggedIn}
						<li class="denied">You must be logged in to view recent documents</li>
					{:else}
						{#each documents as doc}
							<li>
								<a href="/" class="document-title">{doc.title}</a>
								<span class="date"><span class="small">Created: </span>{doc.createdat}</span>
								<span class="date"><span class="small">Viewed: </span>{doc.lastviewed}</span>
							</li>
						{/each}
					{/if}
				</ol>
			</div>
		</div>
	</section>
</main>
{#if modalActive.signup}
	<Modal on:close={() => (modalActive.signup = false)} title="Sign Up">
		<form class="auth-form" on:submit|preventDefault={null}>
			<label for="email"
				><span>Email</span>
				<input type="email" name="email" bind:value={signup.email} />
			</label>
			<label for="password"
				><span>Password</span>
				<input type="password" name="password" bind:value={signup.password} />
			</label>
			<input type="submit" value="Create Account" />
			<p class="status"></p>
		</form>
	</Modal>
{/if}
{#if modalActive.login}
	<Modal on:close={() => (modalActive.login = false)} title="Login">
		<form class="auth-form" on:submit|preventDefault={null}>
			<label for="email"
				><span>Email</span>
				<input type="email" name="email" bind:value={login.email} />
			</label>
			<label for="password"
				><span>Password</span>
				<input type="password" name="password" bind:value={login.password} />
			</label>
			<input type="submit" value="Log in" />
			<p class="status"></p>
		</form>
	</Modal>
{/if}

<style lang="scss">
	:global(body) {
		background-color: #e5e5e5;
		font-family: 'Inter', sans-serif;
	}
	.stripe {
		&.unload {
			bottom: 120vh;
		}
		transition: all 0.4s ease;
		width: 35rem;
		top: 0;
		bottom: 0;
		margin-left: 25vw;
		position: absolute;
		background-color: #be60b7;
		transform: skew(-55deg);
		z-index: -1;

		opacity: 0.4;
		background-image: linear-gradient(to bottom, var(--lin-grad-1));
		background-repeat: no-repeat;
	}
	.hero-container {
		position: relative;
		padding: 5rem;
		overflow: hidden;
		min-height: calc(100vh - 4rem);
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
		width: minmax(min-content, max-content);
		float: left;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 5rem;
		background: linear-gradient(to top right, var(--lin-grad-1));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		transition: all 0.4s ease;
		opacity: 1;
		&.unload {
			opacity: 0;
		}
		.caret {
			transform: translateX(-65%) translateY(15%);
			height: 0.85em;
			display: inline;
			animation: blink 1.5s steps(1, start) infinite;
		}
		@keyframes blink {
			0% {
				opacity: 0;
			}
			50% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
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
		padding: 3.5rem 2.5rem 0 2.5rem;
		height: 40rem;
		clear: both;
		place-items: center;
		@media (max-width: 1000px) {
			grid-template-columns: unset;
			grid-template-rows: unset;
			height: 67.5rem;
		}
	}

	.card {
		background: #be60b744;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 14px;
		backdrop-filter: blur(4px);
		border-radius: 1rem;
		border: 0rem solid #67676732;
		padding: 5%;
		height: 100%;
		width: 100%;
	}

	h3 {
		font-weight: 300;
		font-size: clamp(1.5rem, 2.5vw, 2.5rem);
		margin: 0;
		text-align: center;
		letter-spacing: 0.25rem;
	}

	.panel {
		grid-column: 2 / 3;
		height: max-content;
		@media (max-width: 1000px) {
			grid-column: 1 / 2;
		}
	}

	.doclist {
		overflow-y: auto;
		margin: 0;
		padding: 0;
		list-style-type: upper-roman;
		width: 90%;
		max-height: 22rem;
		margin: 0 auto;
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
			display: flex;
			width: 100%;
			justify-content: space-between;
			padding: 0.75rem 1rem;
		}
		li.denied {
			list-style-type: none;
			font-family: 'Montserrat Alternates', sans-serif;
			font-size: clamp(1.25rem, 2vw, 2.25rem);
			margin: 1rem auto;
			width: max-content;
		}
	}

	.date {
		color: #676767bb;
		font-family: 'Montserrat Alternates', sans-serif;
		margin: 0 0.5vw;
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

	.auth-form {
		padding: 0 max(5rem, 4vw);
		height: 35rem;
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
		justify-content: space-evenly;
		label {
			display: block;
			width: 100%;
			span {
				display: inline-block;
				margin: 1rem 0;
				width: 100%;
				font-size: 2rem;
				padding-left: 0.5rem;
				font-family: 'Montserrat Alternates', sans-serif;
			}
			input {
				width: 100%;
				background: linear-gradient(to right, #bb150032, #d4236832, #be60b732, #8c90e232, #6cb2e732);

				border: rgba(var(--txt), 0.33);
				padding: 0.75rem 2rem;
				border-radius: 100vw;
				color: black;
			}
		}

		input[type="submit"] {
			border: 0.1rem solid var(--dark);
			padding: 0.5rem 1rem;
			border-radius: 100vw;
			background-color: none;
			margin: 0 auto;
		}
	}


</style>

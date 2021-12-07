<script context="module" lang="ts">
	// @ts-ignore
	import { browser } from '$app/env';
	import { API_URL } from '/src/global.d';
	export async function load({ fetch, session }) {
		if(fetch) {
			console.log(`fetch exists, server? ${!browser}`);
			if(!browser) {
				const fetcher = await fetch(`${API_URL}/ping`).catch(console.warn);
				if(fetcher && fetcher.ok) {
					console.log("fetch worked on server!");
				} else {
					console.log("fetch failed on server");
				}
			}
		} else {
			console.log(`fetch does not exist, server? ${!browser}`)
		}
		if (session.loggedIn) {
			const fetcher = await fetch(`${API_URL}/user-docs/10`, {
				headers: {
					Authentication: session.jwt
				}
			}).catch(console.warn)
			if (fetcher && fetcher.ok) {
				return {
					props: {
						documents: await fetcher.json()
					}
				};
			} else {
				console.warn('Failed to load user documents');
				return {};
			}
		} else {
			return {};
		}
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { title } from '$lib/stores';
	import Navigation from '$lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import Modal from '$lib/Modal.svelte';
	import Typewriter from 'tinywriter';
	import LogIn from '$lib/hooks/auth/handleLogin';
	import SignIn from '$lib/hooks/auth/handleSignin';
	import type { AuthenticationForm } from 'src/global';
	import Doclist from '$lib/Doclist.svelte';
	export let documents = [];
	title.set('Docushare');
	let loaded = false;
	let modalActive = {
		login: false,
		signup: false
	};
	let signup: AuthenticationForm = {
		email: '',
		password: '',
		status: '',
		error: false
	};
	let login: AuthenticationForm = {
		email: '',
		password: '',
		status: '',
		error: false
	};
	let header: HTMLElement;
	onMount(() => {
		const writer = new Typewriter(header, 195, '|');
		writer
			.init()
			.defineLoopStart()
			.write('Docushare')
			.put('<br />', 'html')
			.write('Lite')
			.wait(19000)
			.delete(true)
			.wait(1100)
			.defineLoopEnd();
		loaded = true;
	});
	async function handleLogin() {
		modalActive.login = await LogIn(login);
		login = login;
	}
	async function handleSignin() {
		await SignIn(signup);
		signup = signup;
	}
</script>

<Navigation
	on:signup={() => (modalActive.signup = true)}
	on:login={() => (modalActive.login = true)}
	blur={modalActive.signup || modalActive.login}
	page="index"
/>
<main class:blur={modalActive.signup || modalActive.login}>
	<section class="hero-container">
		<h1 class="hero knockout" class:unload={!loaded}>
			<span bind:this={header} />
			<span class="placeholder">Docushare Lite</span>
		</h1>
		<h2 class="hero">
			Markdown and text document sharing platform. Create, share and manage files for free, hosted
			online.
		</h2>
		<div class="stripe" class:unload={!loaded} />
		<div class="utilities-container">
			<div class="card panel">
				<h3>User Panel</h3>
				<hr />
				<Doclist {documents} denied={!$session.loggedIn} listlength={10} maxh={15} />
			</div>
		</div>
	</section>
</main>
{#if modalActive.signup}
	<Modal on:close={() => (modalActive.signup = false)} title="Sign Up">
		<form class="auth-form" on:submit|preventDefault={handleSignin}>
			<label for="email"
				><span>Email</span>
				<input type="email" name="email" bind:value={signup.email} />
			</label>
			<label for="password"
				><span>Password</span>
				<input type="password" name="password" bind:value={signup.password} />
			</label>
			<input type="submit" value="Create Account" />
			<p class="status" class:error={signup.error}>{signup.status}</p>
		</form>
	</Modal>
{/if}
{#if modalActive.login}
	<Modal on:close={() => (modalActive.login = false)} title="Login">
		<form class="auth-form" on:submit|preventDefault={handleLogin}>
			<label for="email"
				><span>Email</span>
				<input type="email" name="email" bind:value={login.email} />
			</label>
			<label for="password"
				><span>Password</span>
				<input type="password" name="password" bind:value={login.password} />
			</label>
			<input type="submit" value="Log in" />
			<p class="status" class:error={login.error}>{login.status}</p>
		</form>
	</Modal>
{/if}

<style lang="scss">
	.stripe {
		&.unload {
			bottom: 120%;
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
		min-height: var(--page-height);
	}
	.hero {
		--txt: 100, 100, 100;
		letter-spacing: 0.25rem;
		color: rgba(var(--txt), 0.33);
		font-family: 'Montserrat Alternates', sans-serif;
	}
	h1.hero {
		overflow: visible;
		position: relative;
		color: black;
		font-size: min(9.5vw, 14.5rem);
		font-weight: bold;
		width: 60vw;
		min-height: calc(2 * min(12vw, 17rem));
		float: left;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 5rem;
		transition: all 0.4s ease;
		opacity: 1;
		.placeholder {
			display: none;
		}
		&.unload {
			opacity: 0;
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
				background: linear-gradient(
					to right,
					#bb150032,
					#d4236832,
					#be60b732,
					#8c90e232,
					#6cb2e732
				);

				border: rgba(var(--txt), 0.33);
				padding: 0.75rem 2rem;
				border-radius: 100vw;
				color: black;
			}
		}

		.status {
			font-size: clamp(1rem, 1.25vw, 2rem);
			text-align: center;
			color: green;
			display: block;
			width: 100%;
			font-weight: lighter;
			font-style: italic;
		}
		.error {
			color: red;
		}

		input[type='submit'] {
			border: 0.1rem solid var(--dark);
			padding: 0.5rem 1rem;
			border-radius: 100vw;
			background-color: none;
			margin: 0 auto;
			cursor: pointer;
			&:hover {
				transition: background-color 0.3s ease, color 0.3s ease;
				background-color: var(--dark);
				color: white;
			}
		}
	}
</style>

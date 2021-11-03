<script lang="ts">
	import { API_URL } from '$lib/global.d';
	import { jwt, loggedIn, user } from '$lib/stores';
	import Navigation from '$lib/Navigation.svelte';
	import caret from '/caret.svg';
	import { onMount } from 'svelte';
	import Modal from '$lib/Modal.svelte';
	let loaded = false;
	let modalActive = {
		login: false,
		signup: false
	};
	let signup = {
		email: '',
		password: '',
		status: '',
		error: false
	};
	let login = {
		email: '',
		password: '',
		status: '',
		error: false
	};
	function handleLogout() {
		return null;
	}
	async function handleLogin() {
		login.status = '';
		login.error = false;
		if (login.email.length <= 0 || login.password.length <= 0) {
			login.status = 'Please fill in all fields';
			login.error = true;
			return;
		}
		const fetcher = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: login.email,
				password: login.password
			})
		});
		if (fetcher.status === 200) {
			jwt.set(await fetcher.text());
			user.set(login.email);
			loggedIn.set(true);
			modalActive.login = false;
		} else {
			login.status = await fetcher.text();
			login.error = true;
		}
	}
	const documents = Array(8).fill({
		title: 'The coodsaffffffffffoo asdf sadf sada fsdasf d',
		createdat: '2020-01-01',
		lastviewed: '2020-01-01'
	});
	onMount(async () => {
		loaded = true;
		const authFetch = await fetch(`${API_URL}/auth/check`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${$jwt}`
			}
		});
		if (authFetch.ok) {
			loggedIn.set(true);
		} else {
			loggedIn.set(false);
			user.invalidate();
			jwt.invalidate();
		}
	});

	async function handleSignin() {
		signup.status = '';
		signup.error = false;
		if (signup.email.length <= 0 || signup.password.length <= 0) {
			signup.status = 'Please fill in all fields';
			signup.error = true;
			return;
		}
		const getPasswordStrength = (pass: string): number => {
			const length_one = pass.length > 8 ? 1 : 0;
			const length_two = pass.length > 12 ? 1 : 0;
			const lowercase = pass.match(/[a-z]/) ? 1 : 0;
			const capital = pass.match(/[A-Z]/) ? 1 : 0;
			const numbers = pass.match(/[0-9]/) ? 1 : 0;
			const nonAlphas = pass.match(/[^a-zA-Z\d\s:]/) ? 1 : 0;
			return length_one + length_two + lowercase + capital + numbers + nonAlphas;
		};
		const strength = getPasswordStrength(signup.password);
		if (strength < 4) {
			signup.error = true;
			signup.status =
				'Please create a stronger password, use uppercase, numbers, non-alphanumerics or increase length';
		} else {
			const fetcher = await fetch(`${API_URL}/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: signup.email,
					password: signup.password
				})
			});
			const res = fetcher;
			if (res.status === 200) {
				signup.status = `${await res.text()}, you may now log in.`;
			} else {
				signup.error = true;
				signup.status = await res.text();
			}
		}
	}
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
	:global(body) {
		background-color: #e5e5e5;
		font-family: 'Inter', sans-serif;
	}
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
			font-size: clamp(1.75rem, 1.25vw, 2.25rem);
			margin: 1rem auto;
			text-align: center;
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

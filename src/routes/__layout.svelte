<script lang="ts">
	import 'normalize.css';
	import '/global.css';
	import { title } from '$lib/stores';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&family=Inter&display=swap"
		rel="stylesheet"
	/>
	<title>{$title}</title>
</svelte:head>

<slot />

<script lang="ts" context="module">
	export async function load({ fetch, page }) {
		const hash = page.params.hash;
		return {
			props: {
				hash
			}
		};
	}
</script>

<script lang="ts">
	import './editor.css';
	import { API_URL } from '/src/global.d';
	import Navigation from '$lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import { jwt } from '$lib/stores';
	import debounce from '$lib/debouncer';
	export let hash = '';
	onMount(async () => {
		const ls_data = JSON.parse(localStorage.getItem('doc-cache'));
		let initialValue = '';
		if (ls_data && ls_data.hash === hash) {
			initialValue = ls_data.content;
		} else {
			const fetched_data = await fetch(`${API_URL}/edit/${hash}`, {
				headers: {
					Authorization: `Bearer ${$jwt}`
				}
			});
			const document = await fetched_data.json();
			initialValue = document.content;
		}
		const Editor = (await import('@toast-ui/editor')).default;
		const editor = new Editor({
			el: document.getElementById('editor'),
			previewStyle: 'vertical',
			height: 'max(80vh, 50rem)',
			initialEditType: 'markdown',
			previewHighlight: false,
			autofocus: true,
			initialValue
		});
		const apiSave = debounce(() => {
			if (document.hasFocus()) {
				const content = editor.getMarkdown();
				fetch(`${API_URL}/save/${hash}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${$jwt}`
					},
					body: content
				});
				console.log('Saved to cloud.');
			}
		}, 35000);
		const save = debounce(() => {
			const content = editor.getMarkdown();
			localStorage.setItem(
				'doc-cache',
				JSON.stringify({
					hash,
					content
				})
			);
			apiSave();
			console.log('Saved locally.');
		}, 2000);
		editor.addHook('keydown', save);
	});
</script>

<Navigation />
<svelte:head>
	<title>{hash}</title>
</svelte:head>

<section class="main-wrapper">
	<style>
		* a {
			color: #4183c4;
			text-decoration: none !important; /* Forgive me */
		}
		* a.absent {
			color: #c00;
		}
		* a.anchor {
			display: block;
			padding-left: 30px;
			margin-left: -30px;
			cursor: pointer;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
		}
		* h1,
		* h2,
		* h3,
		* h4,
		* h5,
		* h6 {
			margin: 20px 0 10px;
			font-weight: 700;
			-webkit-font-smoothing: antialiased;
			cursor: text;
			position: relative;
			border-bottom: 2px solid #c9caca;
		}
		* h1:first-child,
		* h1:first-child + h2,
		* h2:first-child,
		* h3:first-child,
		* h4:first-child,
		* h5:first-child,
		* h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* h1:hover a.anchor,
		* h2:hover a.anchor,
		* h3:hover a.anchor,
		* h4:hover a.anchor,
		* h5:hover a.anchor,
		* h6:hover a.anchor {
			text-decoration: none;
		}
		* h1 code,
		* h1 tt {
			font-size: inherit;
		}
		* h2 code,
		* h2 tt {
			font-size: inherit;
		}
		* h3 code,
		* h3 tt {
			font-size: inherit;
		}
		* h4 code,
		* h4 tt {
			font-size: inherit;
		}
		* h5 code,
		* h5 tt {
			font-size: inherit;
		}
		* h6 code,
		* h6 tt {
			font-size: inherit;
		}
		* h1 {
			font-size: 28px;
			color: #000;
		}
		* h2 {
			font-size: 24px;
			color: #000;
		}
		* h3 {
			font-size: 18px;
		}
		* h4 {
			font-size: 16px;
		}
		* h5 {
			font-size: 14px;
		}
		* h6 {
			color: #777;
			font-size: 14px;
		}
		* blockquote,
		* dl,
		* li,
		* ol,
		* p,
		* pre,
		* table,
		* ul {
			margin: 2rem 0;
		}
		* hr {
			border: 0 none;
			color: var(--dark);
			height: 4px;
			padding: 0;
		}
		* body > h2:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h1:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h1:first-child + h2 {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h3:first-child,
		* body > h4:first-child,
		* body > h5:first-child,
		* body > h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* a:first-child h1,
		* a:first-child h2,
		* a:first-child h3,
		* a:first-child h4,
		* a:first-child h5,
		* a:first-child h6 {
			margin-top: 0;
			padding-top: 0;
		}
		* h1 p,
		* h2 p,
		* h3 p,
		* h4 p,
		* h5 p,
		* h6 p {
			margin-top: 0;
		}
		* p {
			line-height: 120%;
		}
		* li p.first {
			display: inline-block;
		}
		* ol,
		* ul {
			padding-left: 30px;
		}
		* ol :first-child,
		* ul :first-child {
			margin-top: 0;
		}
		* ol :last-child,
		* ul :last-child {
			margin-bottom: 0;
		}
		* dl {
			padding: 0;
		}
		* dl dt {
			font-size: 14px;
			font-weight: 700;
			font-style: italic;
			padding: 0;
			margin: 15px 0 5px;
		}
		* dl dt:first-child {
			padding: 0;
		}
		* dl dt > :first-child {
			margin-top: 0;
		}
		* dl dt > :last-child {
			margin-bottom: 0;
		}
		* dl dd {
			margin: 0 0 15px;
			padding: 0 15px;
		}
		* dl dd > :first-child {
			margin-top: 0;
		}
		* dl dd > :last-child {
			margin-bottom: 0;
		}
		* blockquote {
			border-left: 4px solid #ddd;
			padding: 0 15px;
			color: #777;
		}
		* blockquote > :first-child {
			margin-top: 0;
		}
		* blockquote > :last-child {
			margin-bottom: 0;
		}
		* table {
			padding: 0;
		}
		* table tr {
			border-top: 1px solid #ccc;
			background-color: #fff;
			margin: 0;
			padding: 0;
		}
		* table tr:nth-child(2n) {
			background-color: #f8f8f8;
		}
		* table tr th {
			font-weight: 700;
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		* table tr td {
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		* table tr td :first-child,
		* table tr th :first-child {
			margin-top: 0;
		}
		* table tr td :last-child,
		* table tr th :last-child {
			margin-bottom: 0;
		}
		* img {
			max-width: 100%;
		}
		* span.frame {
			display: block;
			overflow: hidden;
		}
		* span.frame > span {
			border: 1px solid #ddd;
			display: block;
			float: left;
			overflow: hidden;
			margin: 13px 0 0;
			padding: 7px;
			width: auto;
		}
		* span.frame span img {
			display: block;
			float: left;
		}
		* span.frame span span {
			clear: both;
			color: #333;
			display: block;
			padding: 5px 0 0;
		}
		* span.align-center {
			display: block;
			overflow: hidden;
			clear: both;
		}
		* span.align-center > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: center;
		}
		* span.align-center span img {
			margin: 0 auto;
			text-align: center;
		}
		* span.align-right {
			display: block;
			overflow: hidden;
			clear: both;
		}
		* span.align-right > span {
			display: block;
			overflow: hidden;
			margin: 13px 0 0;
			text-align: right;
		}
		* span.align-right span img {
			margin: 0;
			text-align: right;
		}
		* span.float-left {
			display: block;
			margin-right: 13px;
			overflow: hidden;
			float: left;
		}
		* span.float-left span {
			margin: 13px 0 0;
		}
		* span.float-right {
			display: block;
			margin-left: 13px;
			overflow: hidden;
			float: right;
		}
		* span.float-right > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: right;
		}
		* code,
		* tt {
			margin: 0 2px;
			padding: 0 5px;
			white-space: nowrap;
			background-color: #c9caca;
			border-radius: 3px;
		}
		* pre code {
			margin: 0;
			padding: 0;
			white-space: pre;
			border: none;
			background: 0 0;
		}
		* .highlight pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		* pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		* a {
			color: #4183c4;
			text-decoration: none;
		}
		* a.absent {
			color: #c00;
		}
		* a.anchor {
			display: block;
			padding-left: 30px;
			margin-left: -30px;
			cursor: pointer;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
		}
		* h1,
		* h2,
		* h3,
		* h4,
		* h5,
		* h6 {
			margin: 20px 0 10px;
			font-weight: 700;
			-webkit-font-smoothing: antialiased;
			cursor: text;
			position: relative;
			border-bottom: 2px solid #c9caca;
		}
		* h1:first-child,
		* h1:first-child + h2,
		* h2:first-child,
		* h3:first-child,
		* h4:first-child,
		* h5:first-child,
		* h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* h1:hover a.anchor,
		* h2:hover a.anchor,
		* h3:hover a.anchor,
		* h4:hover a.anchor,
		* h5:hover a.anchor,
		* h6:hover a.anchor {
			text-decoration: none;
		}
		* h1 code,
		* h1 tt {
			font-size: inherit;
		}
		* h2 code,
		* h2 tt {
			font-size: inherit;
		}
		* h3 code,
		* h3 tt {
			font-size: inherit;
		}
		* h4 code,
		* h4 tt {
			font-size: inherit;
		}
		* h5 code,
		* h5 tt {
			font-size: inherit;
		}
		* h6 code,
		* h6 tt {
			font-size: inherit;
		}
		* h1 {
			font-size: 28px;
			color: #000;
		}
		* h2 {
			font-size: 24px;
			color: #000;
		}
		* h3 {
			font-size: 18px;
		}
		* h4 {
			font-size: 16px;
		}
		* h5 {
			font-size: 14px;
		}
		* h6 {
			color: #777;
			font-size: 14px;
		}
		* blockquote,
		* dl,
		* li,
		* ol,
		* p,
		* pre,
		* table,
		* ul {
			margin: 2rem 0;
		}
		* hr {
			border: 0 none;
			color: var(--dark);
			height: 4px;
			padding: 0;
		}
		* body > h2:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h1:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h1:first-child + h2 {
			margin-top: 0;
			padding-top: 0;
		}
		* body > h3:first-child,
		* body > h4:first-child,
		* body > h5:first-child,
		* body > h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		* a:first-child h1,
		* a:first-child h2,
		* a:first-child h3,
		* a:first-child h4,
		* a:first-child h5,
		* a:first-child h6 {
			margin-top: 0;
			padding-top: 0;
		}
		* h1 p,
		* h2 p,
		* h3 p,
		* h4 p,
		* h5 p,
		* h6 p {
			margin-top: 0;
		}
		* p {
			line-height: 120%;
		}
		* li p.first {
			display: inline-block;
		}
		* ol,
		* ul {
			padding-left: 30px;
		}
		* ol :first-child,
		* ul :first-child {
			margin-top: 0;
		}
		* ol :last-child,
		* ul :last-child {
			margin-bottom: 0;
		}
		* dl {
			padding: 0;
		}
		* dl dt {
			font-size: 14px;
			font-weight: 700;
			font-style: italic;
			padding: 0;
			margin: 15px 0 5px;
		}
		* dl dt:first-child {
			padding: 0;
		}
		* dl dt > :first-child {
			margin-top: 0;
		}
		* dl dt > :last-child {
			margin-bottom: 0;
		}
		* dl dd {
			margin: 0 0 15px;
			padding: 0 15px;
		}
		* dl dd > :first-child {
			margin-top: 0;
		}
		* dl dd > :last-child {
			margin-bottom: 0;
		}
		* blockquote {
			border-left: 4px solid #ddd;
			padding: 0 15px;
			color: #777;
		}
		* blockquote > :first-child {
			margin-top: 0;
		}
		* blockquote > :last-child {
			margin-bottom: 0;
		}
		* table {
			padding: 0;
		}
		* table tr {
			border-top: 1px solid #ccc;
			background-color: #fff;
			margin: 0;
			padding: 0;
		}
		* table tr:nth-child(2n) {
			background-color: #f8f8f8;
		}
		* table tr th {
			font-weight: 700;
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		* table tr td {
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		* table tr td :first-child,
		* table tr th :first-child {
			margin-top: 0;
		}
		* table tr td :last-child,
		* table tr th :last-child {
			margin-bottom: 0;
		}
		* img {
			max-width: 100%;
		}
		* span.frame {
			display: block;
			overflow: hidden;
		}
		* span.frame > span {
			border: 1px solid #ddd;
			display: block;
			float: left;
			overflow: hidden;
			margin: 13px 0 0;
			padding: 7px;
			width: auto;
		}
		* span.frame span img {
			display: block;
			float: left;
		}
		* span.frame span span {
			clear: both;
			color: #333;
			display: block;
			padding: 5px 0 0;
		}
		* span.align-center {
			display: block;
			overflow: hidden;
			clear: both;
		}
		* span.align-center > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: center;
		}
		* span.align-center span img {
			margin: 0 auto;
			text-align: center;
		}
		* span.align-right {
			display: block;
			overflow: hidden;
			clear: both;
		}
		* span.align-right > span {
			display: block;
			overflow: hidden;
			margin: 13px 0 0;
			text-align: right;
		}
		* span.align-right span img {
			margin: 0;
			text-align: right;
		}
		* span.float-left {
			display: block;
			margin-right: 13px;
			overflow: hidden;
			float: left;
		}
		* span.float-left span {
			margin: 13px 0 0;
		}
		* span.float-right {
			display: block;
			margin-left: 13px;
			overflow: hidden;
			float: right;
		}
		* span.float-right > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: right;
		}
		* code,
		* tt {
			margin: 0 2px;
			padding: 0 5px;
			white-space: nowrap;
			background-color: #c9caca;
			border-radius: 3px;
		}
		* pre code {
			margin: 0;
			padding: 0;
			white-space: pre;
			border: none;
			background: 0 0;
		}
		* .highlight pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		* pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		* pre code,
		* pre tt {
			background-color: transparent;
			border: none;
		}
		* h3,
		* h4,
		* h5,
		* h6 {
			width: max-content;
		}
		* pre code,
		* pre tt {
			background-color: transparent;
			border: none;
		}
		* h3,
		* h4,
		* h5,
		* h6 {
			width: max-content;
		}
	</style>
	<div id="editor" spellcheck="false">
	</div>
</section>
<style lang="scss">

	.main-wrapper {
		padding: 5rem 10rem;
	}

	#editor {
		background-color: white;
	}

	.loader {
		font-size: 10px;
		margin: 50px auto;
		text-indent: -9999em;
		width: 11em;
		height: 11em;
		border-radius: 50%;
		background: #ffffff;
		background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
		background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
		background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
		background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
		background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
		position: relative;
		-webkit-animation: load3 1.4s infinite linear;
		animation: load3 1.4s infinite linear;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
	}
	.loader:before {
		width: 50%;
		height: 50%;
		background: #ffffff;
		border-radius: 100% 0 0 0;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
	}
	.loader:after {
		background: #0dc5c1;
		width: 75%;
		height: 75%;
		border-radius: 50%;
		content: '';
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	@-webkit-keyframes load3 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes load3 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>

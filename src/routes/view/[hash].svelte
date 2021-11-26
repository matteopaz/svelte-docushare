<script lang="ts" context="module">
	// @ts-expect-error
	import { API_URL } from '/src/global.d';
	export async function load({ page, fetch }) {
		const hash = page.params.hash;
		const fetcher: Response = await fetch(`${API_URL}/view/${hash}`);
		if (fetcher.ok) {
			const res = await fetcher.json();
			return {
				props: {
					content: res.content,
					title: res.title,
					created: res.created
				},
				maxage: 60 * 60 * 24 * 1.5 // 36hr cache
			};
		} else {
			return {
				redirect: '/view/',
				status: 303
			}
		}
	}
</script>

<script lang="ts">
	import Navigation from '$lib/Navigation.svelte';
	import { title as HeadTitle } from "$lib/stores";
	import sanitizeHtml from 'sanitize-html';
	import { Remarkable } from 'remarkable';
	export let content: string;
	export let title: string;
	export let created: Date;
	HeadTitle.set(title);
	const readableDate = created.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const md = new Remarkable({
		xhtmlOut: true,
		breaks: true
	});
	const renderedContent = md.render(content);
	const safeContent = sanitizeHtml(renderedContent);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Navigation />
<section class="main-container">
	<style>
		a {
			color: #4183c4;
			text-decoration: none;
		}
		a.absent {
			color: #c00;
		}
		a.anchor {
			display: block;
			padding-left: 30px;
			margin-left: -30px;
			cursor: pointer;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
		}
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 20px 0 10px;
			padding: 1.25rem 0;
			font-weight: 700;
			-webkit-font-smoothing: antialiased;
			cursor: text;
			position: relative;
			border-bottom: 2px solid #c9caca;
		}
		h1:first-child,
		h1:first-child + h2,
		h2:first-child,
		h3:first-child,
		h4:first-child,
		h5:first-child,
		h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		h1:hover a.anchor,
		h2:hover a.anchor,
		h3:hover a.anchor,
		h4:hover a.anchor,
		h5:hover a.anchor,
		h6:hover a.anchor {
			text-decoration: none;
		}
		h1 code,
		h1 tt {
			font-size: inherit;
		}
		h2 code,
		h2 tt {
			font-size: inherit;
		}
		h3 code,
		h3 tt {
			font-size: inherit;
		}
		h4 code,
		h4 tt {
			font-size: inherit;
		}
		h5 code,
		h5 tt {
			font-size: inherit;
		}
		h6 code,
		h6 tt {
			font-size: inherit;
		}
		h1 {
			font-size: 28px;
			color: #000;
		}
		h2 {
			font-size: 24px;
			color: #000;
		}
		h3 {
			font-size: 18px;
		}
		h4 {
			font-size: 16px;
		}
		h5 {
			font-size: 14px;
		}
		h6 {
			color: #777;
			font-size: 14px;
		}
		blockquote,
		dl,
		li,
		ol,
		p,
		pre,
		table,
		ul {
			margin: 2rem 0;
		}
		hr {
			border: 0 none;
			color: var(--dark);
			height: 4px;
			padding: 0;
		}
		body > h2:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		body > h1:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		body > h1:first-child + h2 {
			margin-top: 0;
			padding-top: 0;
		}
		body > h3:first-child,
		body > h4:first-child,
		body > h5:first-child,
		body > h6:first-child {
			margin-top: 0;
			padding-top: 0;
		}
		a:first-child h1,
		a:first-child h2,
		a:first-child h3,
		a:first-child h4,
		a:first-child h5,
		a:first-child h6 {
			margin-top: 0;
			padding-top: 0;
		}
		h1 p,
		h2 p,
		h3 p,
		h4 p,
		h5 p,
		h6 p {
			margin-top: 0;
		}
		p {
			line-height: 120%;
		}
		li p.first {
			display: inline-block;
		}
		ol,
		ul {
			padding-left: 30px;
		}
		ol :first-child,
		ul :first-child {
			margin-top: 0;
		}
		ol :last-child,
		ul :last-child {
			margin-bottom: 0;
		}
		dl {
			padding: 0;
		}
		dl dt {
			font-size: 14px;
			font-weight: 700;
			font-style: italic;
			padding: 0;
			margin: 15px 0 5px;
		}
		dl dt:first-child {
			padding: 0;
		}
		dl dt > :first-child {
			margin-top: 0;
		}
		dl dt > :last-child {
			margin-bottom: 0;
		}
		dl dd {
			margin: 0 0 15px;
			padding: 0 15px;
		}
		dl dd > :first-child {
			margin-top: 0;
		}
		dl dd > :last-child {
			margin-bottom: 0;
		}
		blockquote {
			border-left: 4px solid #ddd;
			padding: 0 15px;
			color: #777;
		}
		blockquote > :first-child {
			margin-top: 0;
		}
		blockquote > :last-child {
			margin-bottom: 0;
		}
		table {
			padding: 0;
		}
		table tr {
			border-top: 1px solid #ccc;
			background-color: #fff;
			margin: 0;
			padding: 0;
		}
		table tr:nth-child(2n) {
			background-color: #f8f8f8;
		}
		table tr th {
			font-weight: 700;
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		table tr td {
			border: 1px solid #ccc;
			text-align: left;
			margin: 0;
			padding: 6px 13px;
		}
		table tr td :first-child,
		table tr th :first-child {
			margin-top: 0;
		}
		table tr td :last-child,
		table tr th :last-child {
			margin-bottom: 0;
		}
		img {
			max-width: 100%;
		}
		span.frame {
			display: block;
			overflow: hidden;
		}
		span.frame > span {
			border: 1px solid #ddd;
			display: block;
			float: left;
			overflow: hidden;
			margin: 13px 0 0;
			padding: 7px;
			width: auto;
		}
		span.frame span img {
			display: block;
			float: left;
		}
		span.frame span span {
			clear: both;
			color: #333;
			display: block;
			padding: 5px 0 0;
		}
		span.align-center {
			display: block;
			overflow: hidden;
			clear: both;
		}
		span.align-center > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: center;
		}
		span.align-center span img {
			margin: 0 auto;
			text-align: center;
		}
		span.align-right {
			display: block;
			overflow: hidden;
			clear: both;
		}
		span.align-right > span {
			display: block;
			overflow: hidden;
			margin: 13px 0 0;
			text-align: right;
		}
		span.align-right span img {
			margin: 0;
			text-align: right;
		}
		span.float-left {
			display: block;
			margin-right: 13px;
			overflow: hidden;
			float: left;
		}
		span.float-left span {
			margin: 13px 0 0;
		}
		span.float-right {
			display: block;
			margin-left: 13px;
			overflow: hidden;
			float: right;
		}
		span.float-right > span {
			display: block;
			overflow: hidden;
			margin: 13px auto 0;
			text-align: right;
		}
		code,
		tt {
			margin: 0 2px;
			padding: 0 5px;
			white-space: nowrap;
			background-color: #c9caca;
			border-radius: 3px;
		}
		pre code {
			margin: 0;
			padding: 0;
			white-space: pre;
			border: none;
			background: 0 0;
		}
		.highlight pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		pre {
			background-color: #c9caca;
			font-size: 13px;
			line-height: 19px;
			overflow: auto;
			padding: 6px 10px;
			border-radius: 3px;
		}
		pre code,
		pre tt {
			background-color: transparent;
			border: none;
		}
		h3,
		h4,
		h5,
		h6 {
			width: max-content;
		}
	</style>
	{@html safeContent}
</section>

<style>
	.main-container {
		max-width: clamp(70rem, 50vw, 90rem);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		margin: 0 auto;
		background-color: var(--offwhite);
		min-height: var(--page-height);
		padding: clamp(3rem, 4vw, 4.5rem);
		font-size: clamp(1.75rem, calc(20 * calc(100vw / 1920)), 2.5rem);
	}
</style>

<script lang="ts">
    export let documents: {hash: string, title: string, owned: string, created: string}[];
	export let listlength = 999;
	export let spacing  = 1;
	export let denied: Boolean = true;
	export let maxh = 10000;
	documents = documents.slice(0, listlength);
</script>

<ol class="doclist" style="max-height: {maxh}rem">
	{#if !denied}
	{#if documents.length > 0}
        {#each documents as doc}
            <li style="padding-top: {spacing}rem; padding-bottom: {spacing}rem;">
                <a href="/edit/{doc.hash}" class="document-title">{doc.title}</a>
                <span class="statistic"><span class="small">Created: </span>{(new Date(doc.created)).toLocaleDateString()}</span>
                <span class="statistic"><span class="small">Owned: </span>{doc.owned}</span>
            </li>
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
			display: grid;
			grid-template-columns: 5fr 3.5fr 5fr;
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
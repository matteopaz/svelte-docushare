<script>
    	const documents = Array(18).fill({
		title: 'Lorem Ipsum Dolor Sit',
		createdat: '2020-01-01',
		lastviewed: '2020-01-01'
	});
</script>

<ol class="doclist">



        {#each documents as doc}
            <li>
                <a href="/" class="document-title">{doc.title}</a>
                <span class="date"><span class="small">Created: </span>{doc.createdat}</span>
                <span class="date"><span class="small">Viewed: </span>{doc.lastviewed}</span>
            </li>
        {/each}



</ol>

<style lang="scss">
.doclist {
		overflow-y: auto;
		margin: 0;
		padding: 0;
		list-style-type: upper-roman;
		width: 90%;
		max-height: 99rem;
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

</style>
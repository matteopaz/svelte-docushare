<script lang="ts">
  import { loggedIn, user, jwt } from '$lib/stores';
  import Navigation from '$lib/Navigation.svelte';
	const documents = Array(15).fill({
		title: 'Lorem Ipsum Dolor Sit',
		createdat: '2020-01-01',
		lastviewed: '2020-01-01'
	});
</script>

<Navigation />
<section class="main-container" class:center={!$loggedIn}>
  {#if $loggedIn}
  <h1>Your Documents - {$user}</h1>
  <hr />
  <ul class="document_list">
    {#each documents as doc}
    <li class="document_list-item">
      <a href="/" class="document-title">{doc.title}</a>
      <span class="date"><span class="small">Created: </span>{doc.createdat}</span>
      <span class="date"><span class="small">Viewed: </span>{doc.lastviewed}</span>
    </li>
  {/each}
  </ul>
  {:else}
    <h1>Please <a href="/">Log in!</a></h1>
  {/if}
</section>

<style lang="scss">
    .main-container {
        max-width: max(70rem, 55vw);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        margin: 0 auto;
        background-color: var(--offwhite);
        height: var(--page-height);
        padding: clamp(3rem, 4vw, 4.5rem);
        &.center {
          display: grid;
          place-items: center;
          h1 {
            padding-bottom: 15rem;
          }
        }
    }
    
    h1 {
      margin: 0;
      text-align: center;
      font-family: 'Montserrat Alternates', sans-serif;
      font-size: clamp(2.75rem, 2vw, 3.5rem);
      a {
        text-decoration: underline;
        color: #3222ee;
      }
    }

    hr {
      margin-top: 3.25rem;
      margin-bottom: 3.25rem;
    }

    .document_list {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: stretch;
      list-style-type: none;
      text-align: center;
      padding: 0;
      height: 85%;
    }

    .document_list-item {
      display: flex;
      justify-content: space-between;
    }
</style>
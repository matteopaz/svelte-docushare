<script lang=ts>
  export let documents: [];
  export let length: number | true;
</script>

{#each documents as doc}
<li>
    <a href="/" class="document-title">{doc.title}</a>
    <span class="date"><span class="small">Created: </span>{doc.createdat}</span>
    <span class="date"><span class="small">Viewed: </span>{doc.lastviewed}</span>
</li>
{/each}

<style lang="postcss">

</style>
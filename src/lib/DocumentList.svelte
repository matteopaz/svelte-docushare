<script lang=ts>
  export let documents: {title: string, createdat: Date, lastviewed: Date}[];
  export let length: number | true = true;
  if(length === true) {
    length = documents.length;
  }
  const used_documents = documents.slice(0, length);
</script>

{#each used_documents as doc}
<li>
    <a href="/" class="document-title">{doc.title}</a>
    <span class="date"><span class="small">Created: </span>{doc.createdat}</span>
    <span class="date"><span class="small">Viewed: </span>{doc.lastviewed}</span>
</li>
{/each}

<style lang="postcss">

</style>
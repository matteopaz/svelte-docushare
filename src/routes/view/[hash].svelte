<script lang=ts context="module">
    export async function load({ page }) {
        if(page.params.hash) {
            return {
                props: {
                    hash: page.params.hash
                }
            }
        }
    }
</script>

<script lang="ts">
    export let hash: string;
</script>

<p>{hash ?? "hash undefined"}</p>

<style lang="postcss">

</style>
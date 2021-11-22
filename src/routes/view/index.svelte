<script lang="ts">
    import { title } from "$lib/stores";
    title.set("Document not found!");
</script>

<a href="/">Home</a>
<div class="wrapper">
    <h1 class="knockout">Viewpage not found!</h1>
    <p>Your URL may be invalid, it should end in /view/[identifier]</p>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        place-items: center;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 5.5rem;
    }

    p {
        margin-bottom: 10rem;
        font-size: 1.5rem;
    }

    a {
        display: block;
        color: blue;
        width: max-content;
        margin: 3rem auto;
        margin-bottom: 0;
        letter-spacing: 0.065rem;
    }
</style>
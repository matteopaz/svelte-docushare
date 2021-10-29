<script lang="ts">
    export let loggedIn = false;
</script>

<nav>
    <a href="/" class="navitem">Home</a>
    <a href="/" class="navitem">Create new document</a>
    <a href="/" class="navitem">Edit existing document</a>
    {#if loggedIn}
      <a href="/" class="navitem">Library</a>
      <a href="/" class="navitem">Log out</a>
    {:else}
    <a href="/" class="navitem">Log in</a>
    <a href="/" class="navitem">Sign up</a>
    {/if}
</nav>

<style lang="scss">
 nav {
    height: 5.5rem;
    border-bottom: 0.125rem solid var(--dark);
    background-color: var(--offwhite);
    display: flex;
    align-items: center;
    justify-content: center;
 }

 .navitem {
     margin: 0 max(5vw, 5rem);
     color: black;
     font-size: clamp(1.15vw, 1.25rem, 2vw);
     letter-spacing: 0.15rem;
     text-decoration: none;
     font-family: 'Source Sans Pro', sans-serif;
     border-color: transparent;
     font-size: clamp(0.75rem, 1.33vw, 1.5rem);
     text-shadow: 0 0.2rem var(--offwhite);
     &:hover {
        transition: border-color 0.4s ease;
         border-bottom: 0.2rem solid var(--dark);
         border-radius: 0.05rem;
         margin-bottom: -0.2rem;
     }
 }
</style>
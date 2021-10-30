<script lang=ts>
import { createEventDispatcher, onMount } from "svelte";
import { spring } from "svelte/motion";
  const dispatch = createEventDispatcher();
  export let title = "";
  const dist = spring(60, { stiffness: 0.1, damping: 0.3 });
  onMount(() => {
    dist.set(0);
  });
</script>

<div class="wrapper" on:click={() => dispatch("close")}>
    <div class="modal" on:click|stopPropagation style="bottom: {$dist}vh">
        <h3>{title}</h3>
        <hr>
        <slot></slot>
    </div>
</div>

<style lang="scss">
    .wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 5;
        display: grid;
        place-items: center;
    }

    h3 {
        text-align: center;
        font-family: 'Montserrat Alternates', sans-serif;
        font-size: clamp(1.5rem, 2vw, 2.5rem);
        letter-spacing: 0.1rem;
    }

    .modal {
        opacity: 1;
        max-width: 75rem;
        min-height: 50rem;
        background-color: var(--offwhite);
        color: black;
        z-index: 1;
        border-radius: 2rem;
        border: 1px solid #44444432;
        position: relative;
    }
</style>
<script lang="ts">
  import { onMount } from "svelte";
  import Countdown from "$lib/Countdown.svelte";

  let until: Date | null;
  onMount(() => {
    until = new Date(new Date().getTime() + 1000 * 125);
    setTimeout(() => {
      until = new Date(new Date().getTime() + 1000 * 65);
    }, 5500);
  });

  function get_data() {}

  function tick() {}
</script>

<div>
  <Countdown {until} />

  <button
    on:mousedown={tick}
    class="btn-primary btn flex mt-10 btn-square mx-auto">TICK</button
  >
</div>

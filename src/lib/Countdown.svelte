<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let until: Date | null = null;
  let duration: Date | null;
  let timer: NodeJS.Timer;
  onMount(() => {
    // needed to ensure fluent update of timer
    setTimeout(update_date, 0);
    // update date every second with timer
    timer = setInterval(update_date, 1000);
  });

  // Make sure to remove the timer
  onDestroy(() => {
    clearInterval(timer);
  });

  // run update_date every time the date is changed;
  $: if (until) update_date();

  function update_date() {
    if (until) {
      let temp = new Date(until.getTime() - new Date().getTime());
      if (temp.getUTCFullYear() !== 1970) {
        duration = null;
      } else {
        duration = temp;
      }
    } else {
      duration = null;
    }
  }
</script>

{#if duration}
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max my-10 ">
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{duration.getUTCHours()};" />
      </span>
      hours
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{duration.getUTCMinutes()};" />
      </span>
      min
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{duration.getUTCSeconds()};" />
      </span>
      sec
    </div>
  </div>
{:else}
  <p class="text-xl text-center p-12">The countdown is over, no time left!</p>
{/if}

<script lang="ts">
  import { browser } from "$app/environment";
  let name =
    (browser ? window.localStorage.getItem("name") : "") ??
    "Please enter a name";
  // this function is being called whenever the name is changed
  function name_change() {
    setTimeout(() => {
      if (name.length > 0) {
        window.localStorage.setItem("name", name);
        get_data();
      }
    }, 0);
  }
  let next_date: Date | null = new Date(new Date().getTime() + 1000 * 20);
  let duration: Date | null = new Date(
    next_date.getTime() - new Date().getTime()
  );
  if (browser) {
    // needed to ensure fluent update of timer
    setTimeout(update_date, 50);
    // update timer every second
    setInterval(update_date, 1000);
  }

  function update_date() {
    if (next_date) {
      let temp = new Date(next_date.getTime() - new Date().getTime());
      if (temp.getUTCFullYear() !== 1970) {
        duration = new Date(0);
      } else {
        duration = temp;
      }
    }
  }

  function get_data() {}

  function tick() {}
</script>

<div class="flex flex-col items-center">
  <h1
    on:input={name_change}
    bind:textContent={name}
    contenteditable="true"
    class="text-5xl underline outline-none my-8 mx-10"
  />

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
  {/if}

  <button
    on:mousedown={tick}
    class="btn-primary btn flex mt-10 btn-square mx-auto">TICK</button
  >
</div>

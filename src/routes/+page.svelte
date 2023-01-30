<script lang="ts">
  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<div class="flex-row justify-center">
  <!-- TODO: Persist user name and automaticall load users current streak -->
  <form method="POST">
    <label class="inline-block flex my-10 mx-auto">
    <div class="ml-auto">Name:</div>
    <input name="name" type="text" class="flex ml-2 mr-auto">
    </label>
    <button class="btn-primary btn flex mt-10 btn-square mx-auto">TICK</button>
  </form>
  <!-- TODO: Add a countdown here -->
  {#if form?.deadline}
    <p>{form?.deadline} {form?.streak}</p>
  {/if}
</div>

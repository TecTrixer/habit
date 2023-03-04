<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  let loaded = false;
  setTimeout((_) => {
    loaded = true;
  }, 0);
</script>

<div class="flex flex-col justify-center">
  <h1 class="text-center text-5xl my-16">Habify</h1>
  {#if loaded && data && !data.loggedIn}
    <a href={data.authUrl} class="btn btn-primary mx-auto">login</a>
  {/if}
</div>

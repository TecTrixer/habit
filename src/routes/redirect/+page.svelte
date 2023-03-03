<script lang="ts">
  import type { PageData } from "./$types";
  import PocketBase from "pocketbase";
  import { onMount } from "svelte";
  import { authenticate, isLoggedIn } from "$lib/auth";

  export let data: PageData;

  onMount(async () => {
    if (data.code && !loggedIn) {
      await authenticate(data.provider, data.code);
      console.log(isLoggedIn());
      console.log(pb.authStore.model);
      loggedIn = isLoggedIn();
    }
  });

  const pb = new PocketBase("http://127.0.0.1:8090");
  let loggedIn = isLoggedIn();
</script>

<div>
  {#if loggedIn}
    <p>{pb.authStore.model}</p>
  {:else}
    <h1 class="text-center m-auto">Authenticating...</h1>
  {/if}
</div>

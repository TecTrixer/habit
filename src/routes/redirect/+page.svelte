<script lang="ts">
  import type { PageData } from "./$types";
  import { PUBLIC_PAGE_URL } from "$env/static/public";
  import { onMount } from "svelte";
  import { authenticate, isLoggedIn } from "$lib/auth";

  export let data: PageData;

  onMount(async () => {
    if (data.code && !loggedIn) {
      await authenticate(data.provider, data.code);
      loggedIn = isLoggedIn();
      returned = true;
      if (loggedIn) {
        redirect();
      }
    } else {
      redirect();
    }
  });

  function redirect() {
    window.location.href = PUBLIC_PAGE_URL;
  }

  let loggedIn = isLoggedIn();
  let returned = false;
</script>

<div>
  {#if returned && !loggedIn}
    <h1 class="text-center m-24 text-xl">
      ERR: There was an error while logging in!
    </h1>
  {:else}
    <h1 class="text-center m-24 text-2xl">Authenticating...</h1>
  {/if}
</div>

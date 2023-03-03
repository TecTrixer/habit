<script lang="ts">
  import type { PageData } from './$types';
  import { isLoggedIn } from "$lib/auth";
  export let data : PageData;

</script>

<div class="flex flex-col justify-center">
  <h1 class="text-center text-5xl my-16">Habify</h1>
  {#if data.authUrl&& !isLoggedIn()}
  <a href={data.authUrl} class="btn btn-primary mx-auto">login</a>
{/if}
</div>

<script lang="ts">
  // IMPORTANT: Cookie blockers like Brave shieleds might block this component when running the dev version of this website
  import { onMount } from "svelte";

  // Hide the banner by default
  let accepted = true;
  onMount(() => {
    // As soon as component is mounted, check if cookies have been accepted, if not then show banner
    if (!window.localStorage.getItem("cookie-banner-accepted")) {
      accepted = false;
    }
  });

  function accept() {
    window.localStorage.setItem("cookie-banner-accepted", "true");
    accepted = true;
  }
</script>

<div>
  <input type="checkbox" id="deny-modal" class="modal-toggle" />
  <div class="modal">
    <label class="modal-box bg-warning text-neutral relative" for="">
      <p>
        You need to accept cookies, otherwise you cannot use this site. You will
        not be tracked through the stored information. The only information
        being stored is for your own convenience (e.g. so that you don't need to
        enter your name every time you reload the site). If you don't want to
        allow any stored information please don't use this website and close it
        now!
      </p>
      <div class="modal-action">
        <label class="btn" on:mousedown={accept} for="deny-modal">Accept</label>
      </div>
    </label>
  </div>

  {#if !accepted}
    <div
      class="fixed w-full bottom-0 -translate-x-1/2 left-1/2 px-6 md:px-28 mb-10 z-50"
    >
      <div class="alert shadow-2xl">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info flex-shrink-0 mr-1 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            >This website stores information (cookies, local storage) for your
            convenience!</span
          >
        </div>
        <div class="flex-none">
          <label for="deny-modal" class="btn btn-sm btn-ghost">Deny</label>
          <button on:mousedown={accept} class="btn btn-sm btn-primary"
            >Accept</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

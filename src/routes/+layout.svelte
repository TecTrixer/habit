<script lang="ts">
  import { browser } from "$app/environment";
  const accepted_storage = browser
    ? window.localStorage.getItem("cookie-banner-acceptation")
    : "unknown";
  import "../app.css";
  export let accepted = accepted_storage !== null;
  function accept() {
    window.localStorage.setItem("cookie-banner-acceptation", "true");
    accepted = true;
  }
</script>

<div>
  <slot />
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
            class="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            >This website stores information (cookies, local storage) for
            authentication with Github (and for storing your consent to this
            banner)</span
          >
        </div>
        <div class="flex-none">
          <button class="btn btn-sm btn-ghost">Deny</button>
          <button on:mousedown={accept} class="btn btn-sm btn-primary"
            >Accept</button
          >
        </div>
      </div>
    </div>
  {/if}
  <footer class="footer footer-center p-4 mt-14 text-base-content">
    <div>
      <p>Copyright © {new Date().getFullYear()} - All rights reserved by TecTrixer</p>
    </div>
  </footer>
</div>

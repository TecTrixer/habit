<script lang="ts">
  import { browser } from "$app/environment";
  import "../app.css";

  // check if cookies have been accepted previously if browser is loaded
  const accepted_storage = browser
    ? window.localStorage.getItem("cookie-banner-acceptation")
    : "unknown";
  let accepted = accepted_storage !== null;

  function accept() {
    window.localStorage.setItem("cookie-banner-acceptation", "true");
    accepted = true;
  }

  // toast logic
  let toast = false;

  async function deny() {
    setTimeout(() => (toast = true), 0);
  }
  if (browser) {
    window.addEventListener("mousedown", close_deny);
  }
  function close_deny() {
    toast = false;
  }
</script>

<div>
  <slot />
  {#if toast}
    <div class="toast toast-top toast-middle">
      <div class="alert alert-warning">
        <div>
          <span
            >You need to accept cookies, otherwise you cannot use this site. You
            will not be tracked through the stored information. The only
            information being stored is for your own convenience (e.g. so that
            you don't need to enter your name every time you reload the site).</span
          >
        </div>
      </div>
    </div>
  {/if}
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
            >This website stores information (cookies, local storage) for your convenience!</span
          >
        </div>
        <div class="flex-none">
          <button on:mousedown={deny} class="btn btn-sm btn-ghost">Deny</button>
          <button on:mousedown={accept} class="btn btn-sm btn-primary"
            >Accept</button
          >
        </div>
      </div>
    </div>
  {/if}
  <footer class="footer footer-center p-4 mt-14 text-base-content">
    <div>
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by TecTrixer
      </p>
    </div>
  </footer>
</div>

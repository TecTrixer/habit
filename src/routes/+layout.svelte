<script lang="ts">
  import "../app.css";
  import CookieBanner from "../lib/CookieBanner.svelte";
</script>

<div>
  <slot />
  <CookieBanner />
  <footer class="footer footer-center p-4 mt-14 text-base-content">
    <div>
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by TecTrixer
      </p>
    </div>
  </footer>
</div>

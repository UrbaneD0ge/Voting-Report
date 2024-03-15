<script>
  import { page } from '$app/stores'; // navigation items

  //loader
  import Loader from './../components/Loader.svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  // cancel loading when navigating to mailto links
  beforeNavigate((event) => {
    if (event.detail.href.startsWith('mailto:')) {
      event.preventDefault();
    }
  });

  let isLoading = false;

  beforeNavigate(() => (isLoading = true));
  afterNavigate(() => (isLoading = false));

  // page transitions
  import { fade } from 'svelte/transition';

  export let data;
</script>

{#key data.pathname}
  <div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
    <slot />
  </div>
{/key}

{#if isLoading}
  <Loader />
{/if}

<style>
  @font-face {
    font-family: 'Tungsten-SemiBold';
    src: url(/fonts/Tungsten-Semibold.otf) format('opentype');
    letter-spacing: 2pt;
  }

  @font-face {
    font-family: 'GT-Eesti-Regular';
    src: url(/fonts/GT-Eesti-Display-Regular.otf) format('opentype');
  }
</style>

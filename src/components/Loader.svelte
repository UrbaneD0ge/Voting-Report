<script>
  import { fade } from 'svelte/transition';
</script>

<div class="loader" transition:fade />

<style>
  .loader {
    border: 16px solid #f3f3f3f6;
    border-top: 16px solid #e0c300;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
    box-sizing: content-box;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  import { fade } from 'svelte/transition';
</script>

<div class="loader" transition:fade />

<style>
  .loader {
    border: 5px solid #c3c2c2f3;
    border-top: 5px solid #0b5ed7;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 0.5s linear infinite;
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

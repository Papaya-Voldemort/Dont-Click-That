<script>
  let { children } = $props();
</script>

<div class="card">
  {@render children()}
</div>

<style>
  .card {
    width: min(1450px, 95vw);
    height: var(--card-height);
    max-height: 95vh;

    background: var(--card-border);
    border-radius: var(--card-radius);

    padding: var(--card-padding);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);

    transition:
      width 0.5s ease,
      height 0.5s ease;

    overflow: none;
  }
</style>

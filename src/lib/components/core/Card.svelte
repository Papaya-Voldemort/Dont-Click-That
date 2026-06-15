<script>
  let { children, noPadding = false } = $props();
</script>

<div class="card" class:no-padding={noPadding}>
  {@render children()}
</div>

<style>
  .card {
    width: min(1450px, 95vw);
    height: var(--card-height);
    max-height: 95vh;

    background: rgba(255, 255, 255, 0.95);
    border-radius: var(--card-radius);

    padding: var(--card-padding);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.3),
      0 1px 3px rgba(255, 255, 255, 0.2) inset;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);

    transition:
      width 0.5s ease,
      height 0.5s ease;

    overflow: hidden;
  }

  .card.no-padding {
    padding: 0;
  }
</style>

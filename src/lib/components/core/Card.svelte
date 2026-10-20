<script>
  let { children, noPadding = false, fitContent = false, maxWidth = "none" } = $props();
</script>

<div
  class="card"
  class:no-padding={noPadding}
  class:fit-content={fitContent}
  style:max-width={maxWidth}
>
  {@render children()}
</div>

<style>
  .card {
    width: 100%;
    height: calc(100dvh - 2 * var(--viewport-gutter));
    min-height: 0;
    margin-inline: auto;

    background: rgba(255, 255, 255, 0.96);
    border-radius: var(--card-radius);

    padding: var(--card-padding);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    box-shadow:
      0 12px 36px rgba(0, 0, 0, 0.35),
      0 1px 3px rgba(255, 255, 255, 0.2) inset;
    border: 1px solid rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(16px);

    overflow-y: auto;
    overflow-x: hidden;
  }

  .card.no-padding {
    padding: 0;
  }

  .card.fit-content {
    height: auto;
  }
</style>

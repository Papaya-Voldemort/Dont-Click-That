<script>
  let {
    children,
    variant = "default",
    size = "md",
    disabled = false,
    style = "",
    onclick = undefined,
    ...props
  } = $props();
</script>

<button
  class="btn"
  class:disabled
  {disabled}
  {style}
  {onclick}
  data-variant={variant}
  data-size={size}
  {...props}
>
  <span class="btn-top">
    {@render children()}
  </span>
</button>

<style>
  /* --- Base Button Logic --- */

  .btn {
    position: relative;
    width: var(--btn-width);

    /* theme vars */
    --current-bg: var(--color-safe);
    --current-shadow: var(--color-safe-dark);
    --current-text: var(--text-inverted);

    background: var(--current-shadow);
    border-radius: var(--btn-radius);
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 0.2s;

    min-height: 44px;
    min-width: 44px;
    cursor: pointer;
  }

  .btn-top {
    display: block;
    position: relative;

    padding: var(--btn-padding-y) var(--btn-padding-x);

    font-size: var(--btn-font-size);

    background: var(--current-bg);
    border-radius: var(--btn-radius);
    color: var(--current-text);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    transform: translateY(calc(-1 * var(--btn-depth)));
    transition: transform 0.1s ease;
  }

  /* Disabled styles */

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn:disabled .btn-top {
    transform: translateY(calc(-1 * var(--btn-depth)));
  }

  .btn:disabled:hover .btn-top {
    transform: translateY(calc(-1 * var(--btn-depth)));
  }

  /* --- Hover & Active Interaction --- */

  @media (hover: hover) and (pointer: fine) {
    .btn:hover .btn-top {
      transform: translateY(calc(-1 * var(--btn-depth) - 2px));
    }

    .btn:hover {
      filter: brightness(1.05);
    }
  }

  .btn:active {
    filter: brightness(0.95);
  }

  .btn:active .btn-top {
    transform: translateY(0);
  }

  /* Color Types --- */

  .btn[data-variant="safe"] {
    --current-bg: var(--color-safe);
    --current-shadow: var(--color-safe-dark);
  }

  .btn[data-variant="warn"] {
    --current-bg: var(--color-warn);
    --current-shadow: var(--color-warn-dark);
  }

  .btn[data-variant="danger"] {
    --current-bg: var(--color-danger);
    --current-shadow: var(--color-danger-dark);
  }

  .btn[data-variant="success"] {
    --current-bg: var(--color-success);
    --current-shadow: var(--color-success-dark);
  }

  .btn[data-variant="default"] {
    --current-bg: var(--color-gray);
    --current-shadow: var(--color-gray-dark);
    --current-text: var(--text-main);
  }

  /* Size Variants */

  .btn[data-size="sm"] {
    --btn-padding-y: 8px;
    --btn-padding-x: 16px;
    --btn-font-size: 0.875rem;
    --btn-depth: 3px;
  }

  .btn[data-size="md"] {
    --btn-padding-y: 12px;
    --btn-padding-x: 24px;
    --btn-font-size: 1rem;
    --btn-depth: 4px;
  }

  .btn[data-size="lg"] {
    --btn-padding-y: 16px;
    --btn-padding-x: 32px;
    --btn-font-size: 1.125rem;
    --btn-depth: 5px;
  }

  .btn[data-size="xl"] {
    --btn-padding-y: 32px;
    --btn-padding-x: 64px;
    --btn-font-size: 2rem;
    --btn-depth: 10px;
  }

  .btn[data-size="grade"] {
    --btn-padding-y: clamp(0.9rem, 2.4vw, 1.4rem);
    --btn-padding-x: clamp(0.75rem, 2vw, 1.25rem);
    --btn-font-size: clamp(0.95rem, 1.8vw, 1.5rem);
    --btn-depth: clamp(3px, 0.8vw, 8px);
  }

  /* Focus states */

  .btn:focus-visible {
    outline: none;
    position: relative;
  }

  .btn[data-variant="safe"]:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--color-safe) 40%, transparent),
      0 0 0 6px color-mix(in srgb, var(--color-safe) 20%, transparent);
  }

  .btn[data-variant="warn"]:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--color-warn) 40%, transparent),
      0 0 0 6px color-mix(in srgb, var(--color-warn) 20%, transparent);
  }

  .btn[data-variant="danger"]:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--color-danger) 40%, transparent),
      0 0 0 6px color-mix(in srgb, var(--color-danger) 20%, transparent);
  }

  .btn[data-variant="success"]:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--color-success) 40%, transparent),
      0 0 0 6px color-mix(in srgb, var(--color-success) 20%, transparent);
  }

  .btn[data-variant="default"]:focus-visible {
    box-shadow:
      0 0 0 3px rgba(0, 0, 0, 0.25),
      0 0 0 6px rgba(0, 0, 0, 0.1);
  }

  /* Media accessibility */
  @media (prefers-reduced-motion: reduce) {
    .btn,
    .btn-top {
      transition: none;
    }
  }
</style>

<script lang="ts">
  import type { url as Url } from "../../stores/levels";

  let { url }: { url: Url } = $props();
</script>

<div class="site-preview">
  <div class="browser-bar">
    <div class="dots"><span></span><span></span><span></span></div>

    <div class="urlBar">
      <span class="protocol">{url.protocol}://</span>
      <span class="subdomain">{url.subdomain ? url.subdomain + "." : ""}</span>
      <span class="domain">{url.domain}{url.tld ? "." + url.tld : ""}</span>
      {#if url.path}<span class="path">{url.path}</span>{/if}
    </div>
  </div>

  {#if url.preview === "checkout"}
    <section class="checkout" aria-label="Checkout page preview">
      <div class="checkout-header">
        <span class="wordmark"><span>Pay</span>Pal</span>
        <span class="checkout-title">Checkout</span>
      </div>
      <div class="order-line">
        <span>Wireless headphones <small>Order #1048 · Qty 1</small></span>
        <strong>$49.00</strong>
      </div>
      <div class="payment-details">
        <div class="card-field full-width">
          <span>Card number</span><strong>•••• &nbsp; •••• &nbsp; •••• &nbsp; ••••</strong>
        </div>
        <div class="card-field"><span>Expiry date</span><strong>MM / YY</strong></div>
        <div class="card-field"><span>Security code</span><strong>CVV</strong></div>
      </div>
      <span class="checkout-cta">Complete purchase</span>
    </section>
  {/if}
</div>

<style>
  .site-preview {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--color-gray, #ccc);
    border-radius: 12px;
    overflow: hidden;
    background: white;
    width: 100%;
    max-width: 52rem;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .browser-bar {
    flex-shrink: 0;
    background: var(--bg-subtle);
    padding: 8px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    max-width: 100%;
  }

  .dots {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }
  .dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-divider);
  }

  .urlBar {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    background-color: var(--bg-app, #f4f4f4);
    border: 2px solid var(--color-gray, #ccc);
    border-radius: 8px;
    font-family: var(--mono-font, monospace);
    font-size: clamp(0.75rem, 2.2vw, 0.9rem);
    color: var(--text-main, #333);
    overflow-wrap: anywhere;
    white-space: normal;
    box-sizing: border-box;
  }

  .protocol,
  .subdomain,
  .domain,
  .path {
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .path {
    color: var(--text-secondary);
  }

  .protocol {
    color: var(--text-muted);
    flex-shrink: 0;
  }
  .domain {
    font-weight: 700;
    color: var(--text-brand-dark);
  }

  .checkout {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: clamp(0.85rem, 2vw, 1.25rem);
    border-top: 1px solid var(--card-border);
    text-align: left;
    color: #243746;
    line-height: 1.4;
  }

  .checkout-header,
  .order-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .wordmark {
    color: #0070ba;
    font-size: 1.65rem;
    font-weight: 800;
    font-style: italic;
    letter-spacing: -0.06em;
    line-height: 1.2;
  }

  .wordmark span {
    color: #003087;
  }

  .checkout-title {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .order-line {
    padding-block: 0.5rem;
    border-block: 1px solid var(--card-border);
    font-size: 0.95rem;
  }

  .order-line small {
    display: block;
    color: var(--text-secondary);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .payment-details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .card-field {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    min-width: 0;
  }

  .card-field.full-width {
    grid-column: 1 / -1;
  }

  .card-field span,
  .card-field strong {
    display: block;
  }

  .card-field span {
    font-size: 0.7rem;
    color: var(--text-secondary);
  }

  .card-field strong {
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 0.25rem;
    overflow-wrap: anywhere;
  }

  .checkout-cta {
    display: block;
    padding: 0.7rem 1rem;
    background: #0070ba;
    border-radius: 999px;
    text-align: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .checkout {
      padding: 8px 12px;
      gap: 0.5rem;
    }

    .payment-details {
      grid-template-columns: 2fr 1fr 1fr;
    }

    .card-field.full-width {
      grid-column: auto;
    }

    .browser-bar {
      padding: 4px 8px;
    }
    .urlBar {
      padding: 0.25rem 0.6rem;
      font-size: 0.8rem;
    }
  }
</style>

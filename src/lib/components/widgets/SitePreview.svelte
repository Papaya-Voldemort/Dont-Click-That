<script>
  let {
    children,
    url = {
      protocol: "https",
      subdomain: "gooooogle.com",
      domain: "realsites.xyz",
    },
    isWireframe = true,
  } = $props();
</script>

<div class="site-preview" class:wireframe={isWireframe}>
  <div class="browser-bar">
    <div class="dots"><span></span><span></span><span></span></div>

    <div class="urlBar">
      <span class="protocol">{url.protocol}://</span>
      <span class="subdomain">{url.subdomain ? url.subdomain + "." : ""}</span>
      <span class="domain">{url.domain}</span>
    </div>
  </div>

  <div class="content-area">
    {#if isWireframe}
      <div class="wf-box hero"></div>
      <div class="wf-box line"></div>
      <div class="wf-box line"></div>
    {:else}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .site-preview {
    border: 2px solid var(--color-gray, #ccc);
    border-radius: 12px;
    overflow: hidden;
    background: white;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .browser-bar {
    background: #f9f9f9;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--color-gray, #ddd);
  }

  .dots {
    display: flex;
    gap: 6px;
  }
  .dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ddd;
  }

  .urlBar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.6rem 1rem;
    background-color: var(--bg-app, #f4f4f4);
    border: 2px solid var(--color-gray, #ccc);
    border-radius: 8px;
    font-family: var(--mono-font, monospace);
    font-size: 0.9rem;
    color: var(--text-main, #333);
    overflow: hidden;
  }

  .protocol {
    color: #888;
  }
  .domain {
    font-weight: 700;
    color: #222;
  }

  .content-area {
    padding: 20px;
    min-height: 200px;
  }

  /* Wireframe Styles */
  .wireframe .wf-box {
    background: #e0e0e0;
    margin-bottom: 12px;
    border-radius: 4px;
  }
  .wireframe .hero {
    height: 120px;
  }
  .wireframe .line {
    height: 12px;
    width: 85%;
  }
  .wireframe .line:last-child {
    width: 60%;
  }
</style>

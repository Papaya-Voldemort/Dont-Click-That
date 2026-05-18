<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";

  let {
    name = "Game Screen",
    contentType = "url",
    content = {
      url: {
        protocol: "https://",
        subdomain: "gooooogle.com",
        domain: "realsites.xyz",
      },
    },
    ...props
  } = $props();

  const GradeBtns = [
    { label: "Safe", variant: "safe" },
    { label: "Suspicious", variant: "warn" },
    { label: "Phishing", variant: "danger" },
  ];
</script>

<Card>
  <div class="main">
    <!-- Start of left side -->
    <div class="inside left">
      {#if contentType === "url"}
        <div class="header">
          <h1>Is this URL safe?</h1>
        </div>

        <div class="content">
          <span class="urlBar">
            <span class="protocol">
              {content.url.protocol}
            </span>

            <span class="subdomain">
              {content.url.subdomain}
            </span>

            <span class="domain">
              {`.${content.url.domain}`}
            </span>
          </span>
        </div>
      {/if}
    </div>

    <!-- Start of right side -->
    <div class="inside right">
      <h1>Grade This URL</h1>
      <div class="grade-btns">
        {#each GradeBtns as btn}
          <Button variant={btn.variant} size="grade">{btn.label}</Button>
        {/each}
      </div>
    </div>
  </div>
</Card>

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem; /* Keeps a healthy separation between columns */
  }

  .inside {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .left {
    text-align: center;
  }

  .right {
    text-align: center;
  }

  .header,
  .right h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    margin: 0 0 1rem 0;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    margin-top: 0;
  }

  .grade-btns {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4.5rem;
  }

  .urlBar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    padding: 0.9rem 1.2rem;
    background-color: var(--bg-app);
    border: 3px solid var(--color-gray);
    border-radius: 16px;
    font-family: var(--mono-font);
    font-size: 1.1rem;
    color: var(--text-main);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: text;
    cursor: text;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  .urlBar:hover {
    border-color: var(--color-gray-dark);
    background-color: var(--card-border);
  }

  /* .urlBar::before {
    content: "🔒";
    margin-right: 0.75rem;
    font-size: 1rem;
    filter: grayscale(
      100%
    );
    opacity: 0.6;
  } */

  .protocol {
    color: var(--color-gray);
  }

  .domain,
  .subdomain {
    color: var(--text-main);
  }
</style>

<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import SitePreview from "../widgets/SitePreview.svelte";
  import { gameState, resetGame, submitAnswer } from "../../stores/game";
  import type { url, email, text } from "../../stores/levels";
  import TextPreview from "../widgets/TextPreview.svelte";
  import EmailPreview from "../widgets/EmailPreview.svelte";

  const progressPercent = $derived(
    Math.round((($gameState.currentLv + 1) / $gameState.levels) * 100),
  );

  const currentLevel = $derived($gameState.challenges[$gameState.currentLv]);
  const contentType = $derived(currentLevel?.contentType);
  const content = $derived(currentLevel?.content);

  // Type guard for URL content
  const urlContent = $derived(contentType === "url" ? (content as url) : null);

  const GradeBtns = [
    { label: "Safe", variant: "safe", value: "safe" },
    { label: "Suspicious", variant: "warn", value: "sus" },
    { label: "Threat", variant: "danger", value: "threat" },
  ];
</script>

<Card fitContent maxWidth="68rem">
  <div class="main">
    <div class="top-nav">
      <Button variant="default" size="sm" onclick={resetGame}>Home</Button>
      <div
        class="progress-bar-container"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Training Progress"
        aria-valuetext="Question {$gameState.currentLv + 1} of {$gameState.levels}"
      >
        <div class="progress-fill" style="width: {progressPercent}%;"></div>
      </div>
      <div class="level-meta">
        {#if $gameState.mode === "demo"}<span class="level-pill">Quick Demo</span>{/if}
        <span class="level-pill">Level {$gameState.currentLv + 1} / {$gameState.levels}</span>
      </div>
    </div>

    <div class="content-panel">
      {#if contentType === "url" && urlContent}
        <div class="header">
          <h1>Is this URL safe?</h1>
        </div>

        <div class="content">
          <SitePreview url={urlContent} />
        </div>
      {:else if contentType === "text"}
        <div class="header">
          <h1>How risky is this?</h1>
        </div>

        <div class="content">
          <TextPreview messages={content as text[]} />
        </div>
      {:else if contentType === "email"}
        <div class="header">
          <h1>How risky is this?</h1>
        </div>

        <div class="content">
          <EmailPreview emailInfo={content as email} />
        </div>
      {/if}
    </div>

    <div class="actions">
      <div class="grade-btns">
        {#each GradeBtns as btn}
          <Button
            variant={btn.variant}
            size="grade"
            style="--btn-width: 100%;"
            disabled={$gameState.screen !== "game" || !!$gameState.lastButtonPressed}
            onclick={() => submitAnswer(btn.value)}>{btn.label}</Button
          >
        {/each}
      </div>
    </div>
  </div>
</Card>

<style>
  .main {
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 1.5vw, 1.25rem);
    align-items: stretch;
    flex: 1;
    min-height: min(36rem, calc(100dvh - 2 * var(--viewport-gutter) - 2 * var(--card-padding)));
  }

  .top-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding-bottom: 0.25rem;
    flex-shrink: 0;
  }

  .progress-bar-container {
    flex: 1;
    height: 10px;
    background-color: var(--card-border, #e5e7eb);
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-safe), var(--color-success));
    border-radius: 9999px;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .level-meta {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .level-pill {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-secondary);
    background: var(--bg-subtle, #f3f4f6);
    padding: 0.2rem 0.6rem;
    border-radius: 8px;
    border: 1px solid var(--card-border, #e5e7eb);
  }

  .content-panel {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    text-align: center;
    padding-block: 0.75rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem 0;
    flex-shrink: 0;
  }

  .header h1 {
    font-size: clamp(1.35rem, 3vw, 2rem);
    margin: 0;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin-top: 0;
    flex-direction: column;
    width: 100%;
    min-height: 0;
  }

  .actions {
    margin-top: auto;
    padding-top: 0.5rem;
    flex-shrink: 0;
  }

  .grade-btns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.4rem, 1.2vw, 1rem);
    align-items: stretch;
  }

  .grade-btns :global(.btn) {
    width: 100%;
  }

  @media (max-width: 480px) {
    .top-nav {
      flex-wrap: wrap;
    }

    .top-nav :global(.btn) {
      width: auto;
    }

    .level-meta {
      width: 100%;
      justify-content: flex-end;
    }

    .header h1 {
      font-size: 1.25rem;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .top-nav {
      padding-bottom: 0;
      gap: 0.5rem;
    }

    .header {
      margin-bottom: 0.2rem;
    }

    .header h1 {
      font-size: 1.1rem;
    }

    .main {
      gap: 0.35rem;
    }

    .content-panel {
      padding-block: 0.25rem;
    }

    .actions {
      padding-top: 0.2rem;
    }
  }
</style>

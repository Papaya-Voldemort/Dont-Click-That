<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import SitePreview from "../widgets/SitePreview.svelte";
  import { gameState, nextLevel, updateScore, updateScreen } from "../../stores/game";
  import { levels } from "../../stores/levels";
  import TextPreview from "../widgets/TextPreview.svelte";
  import EmailPreview from "../widgets/EmailPreview.svelte";

  const progressPercent = $derived(($gameState.currentLv / $gameState.levels) * 100);

  const { contentType, content, scoreValues } = $derived.by(() => levels[$gameState.currentLv]);

  // Type guard for URL content
  const urlContent = $derived.by(() => (contentType === "url" ? (content as any) : null));

  const GradeBtns = [
    { label: "Safe", variant: "safe", value: "safe" },
    { label: "Suspicious", variant: "warn", value: "sus" },
    { label: "Threat", variant: "danger", value: "threat" },
  ];

  function score(button: string) {
    console.log(button);
    const scoreObj = scoreValues.find((s) => s.name === button);
    gameState.update((state) => ({ ...state, lastButtonPressed: button }));
    updateScore(scoreObj?.value ?? 0);
    updateScreen("info");
  }
</script>

<Card>
  <div class="main">
    <div class="content-panel">
      {#if contentType === "url"}
        <div class="header">
          <h1>Is this URL safe?</h1>
        </div>

        <div class="content">
          <SitePreview isWireframe={true} url={urlContent}>
            <span>No Content</span>
          </SitePreview>
        </div>
      {:else if contentType === "text"}
        <div class="header">
          <h1>How risky is this?</h1>
        </div>

        <div class="content">
          <TextPreview messages={content as any} />
        </div>
      {:else if contentType === "email"}
        <div class="header">
          <h1>How risky is this?</h1>
        </div>

        <div class="content">
          <EmailPreview emailInfo={content} />
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
            onclick={() => score(btn.value)}>{btn.label}</Button
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
    gap: clamp(1rem, 2vw, 1.75rem);
    align-items: stretch;
    height: 100%;
    min-height: 0;
  }

  .content-panel {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
    text-align: center;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 0;
    margin-top: 0;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .actions {
    margin-top: auto;
  }

  .grade-btns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.75rem, 1.5vw, 1.25rem);
    align-items: stretch;
  }

  .grade-btns :global(.btn) {
    width: 100%;
  }

  @media (max-width: 720px) {
    .main {
      gap: 1rem;
    }

    .header {
      height: auto;
      margin-bottom: 0.75rem;
    }

    .grade-btns {
      gap: 0.5rem;
    }
  }
</style>

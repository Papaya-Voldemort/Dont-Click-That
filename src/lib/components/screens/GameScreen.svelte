<script lang="ts">
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import SitePreview from "../widgets/SitePreview.svelte";

  import {
    gameState,
    nextLevel,
    updateScore,
    updateScreen,
  } from "../../stores/game";
  import { levels } from "../../stores/levels";
  import TextPreview from "../widgets/TextPreview.svelte";

  const { contentType, content, scoreValues } = $derived.by(
    () => levels[$gameState.currentLv],
  );

  // Type guard for URL content
  const urlContent = $derived.by(() =>
    contentType === "url" ? (content as any) : null,
  );

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
    <!-- Start of left side -->
    <div class="inside left">
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
      {/if}
    </div>

    <!-- Start of right side -->
    <div class="inside right">
      <div class="grade-btns">
        {#each GradeBtns as btn}
          <Button
            variant={btn.variant}
            size="grade"
            onclick={() => score(btn.value)}>{btn.label}</Button
          >
        {/each}
      </div>
    </div>
  </div>
</Card>

<!-- TODO:
 Add Full Site category
 Add texts
 add emails -->

<!-- TODO: Add intiactor of what level it is -->

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    align-items: stretch;
    height: 100%;
  }

  .inside {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .left {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

  .right {
    text-align: center;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    min-height: 100%;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    margin: 0 0 1rem 0;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 0;
    margin-top: 0;
    flex-direction: column;
    flex: 1;
  }

  .grade-btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    margin-top: 1rem;
    height: 100%;
  }
</style>

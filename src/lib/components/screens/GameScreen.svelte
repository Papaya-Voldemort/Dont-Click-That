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
      <h1>Grade This URL</h1>
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
    flex-direction: column;
    flex: 1;
  }

  .grade-btns {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4.5rem;
    margin-top: 1rem;
  }

  .right h1 {
    margin: 0 0 0.5rem 0;
  }
</style>

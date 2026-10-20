<script lang="ts">
  import Card from "../core/Card.svelte";
  import { gameState, nextLevel, updateScreen } from "../../stores/game";
  import Button from "../core/Button.svelte";
  import CheckIcon from "../../assets/images/check.svg?raw";
  import ErrorIcon from "../../assets/images/error.svg?raw";

  const variantColors: Record<string, string> = {
    safe: "var(--color-safe)",
    sus: "var(--color-warn)",
    threat: "var(--color-danger)",
  };

  const level = $derived($gameState.challenges[$gameState.currentLv]);
  const scoreObj = $derived(
    level?.scoreValues.find((s) => s.name === $gameState.lastButtonPressed),
  );

  // 1. Determine response tier
  const isCorrect = $derived(scoreObj?.value === 1);
  const isPartial = $derived(scoreObj?.value === 0.5);

  const correctAnswer = $derived(level?.scoreValues.find((s) => s.value === 1));
  const correctColor = $derived(
    correctAnswer?.name ? (variantColors[correctAnswer.name] ?? "#999") : "#999",
  );

  const isLastLevel = $derived($gameState.currentLv >= $gameState.levels - 1);

  // Dynamic border/accent theme color based on success/caution/failure
  const themeColor = $derived(
    isCorrect
      ? "var(--color-success, #58cc02)"
      : isPartial
        ? "var(--color-warn, #ffc800)"
        : "var(--color-danger, #ff4b4b)",
  );

  const text = $derived(scoreObj?.feedback ?? "");

  function deepDive() {
    updateScreen("deepDive");
  }
</script>

<Card fitContent maxWidth="48rem">
  <div class="main" style="--theme-color: {themeColor};">
    <span class="level-badge">Level {$gameState.currentLv + 1} of {$gameState.levels}</span>

    <div class="content-wrapper">
      {#if isCorrect}
        <div class="status-icon success" aria-hidden="true">
          {@html CheckIcon}
        </div>
        <h2 class="status-title success-text">Correct!</h2>
      {:else if isPartial}
        <div class="status-icon caution" aria-hidden="true">
          {@html CheckIcon}
        </div>
        <h2 class="status-title caution-text">Good Caution!</h2>
      {:else}
        <div class="status-icon failure" aria-hidden="true">
          {@html ErrorIcon}
        </div>
        <h2 class="status-title failure-text">Let's Take Another Look</h2>
      {/if}

      <p class="feedback-text">{text}</p>

      {#if !isCorrect && correctAnswer}
        <div class="solution-box" style="--badge-color: {correctColor}">
          <span class="solution-label">Correct Classification:</span>
          <span class="solution-badge"
            >{correctAnswer.name === "sus" ? "SUSPICIOUS" : correctAnswer.name.toUpperCase()}</span
          >
        </div>
      {/if}
    </div>

    <div class="button-container">
      <Button variant="default" size="md" onclick={deepDive}>Why? (Deep Dive)</Button>
      <Button variant="safe" size="md" onclick={() => nextLevel()}>
        {isLastLevel ? "Finish Training 🏆" : "Next →"}
      </Button>
    </div>
  </div>
</Card>

<style>
  .main {
    box-sizing: border-box;
    width: 100%;
    border: solid 4px var(--theme-color);
    background: var(--gradient-light);
    padding: clamp(1rem, 2.5vw, 2rem);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    position: relative;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.02);
  }

  .level-badge {
    align-self: flex-start;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    background: rgba(255, 255, 255, 0.8);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 580px;
    margin: 0 auto;
    padding: 0.5rem 0;
  }

  .status-icon {
    margin-bottom: 0.5rem;
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .status-icon.success {
    color: var(--color-success, #58cc02);
  }
  .status-icon.caution {
    color: var(--color-warn-dark, #e5b400);
  }
  .status-icon.failure {
    color: var(--color-danger, #ff4b4b);
  }

  .status-title {
    font-size: clamp(1.4rem, 3.5vw, 1.85rem);
    font-weight: 800;
    margin: 0 0 0.75rem 0;
    letter-spacing: -0.02em;
  }

  .success-text {
    color: var(--color-success-dark, #46a302);
  }
  .caution-text {
    color: #b45309;
  }
  .failure-text {
    color: var(--color-danger-dark, #d33131);
  }

  .feedback-text {
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    line-height: 1.5;
    color: #334155;
    margin: 0;
  }

  .solution-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.4rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  .solution-label {
    color: #64748b;
    font-weight: 500;
  }

  .solution-badge {
    background: var(--badge-color);
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  .button-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    max-width: 36rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    .button-container {
      grid-template-columns: 1fr;
    }
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .main {
      padding: 0.75rem 1rem;
    }

    .level-badge {
      margin-bottom: 0.25rem;
      align-self: flex-start;
    }

    .content-wrapper {
      padding: 0.25rem 0;
    }

    .status-icon {
      margin-bottom: 0.15rem;
    }

    .status-title {
      font-size: 1.2rem;
      margin-bottom: 0.35rem;
    }

    .feedback-text {
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }

    .button-container {
      margin-top: 0.25rem;
    }
  }
</style>

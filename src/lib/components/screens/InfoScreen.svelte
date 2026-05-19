<script lang="ts">
  import Card from "../core/Card.svelte";
  import { levels } from "../../stores/levels";
  import { gameState, nextLevel } from "../../stores/game";
  import Button from "../core/Button.svelte";
  import CheckIcon from "../../assets/images/check.svg?raw";
  import ErrorIcon from "../../assets/images/error.svg?raw";

  const variantColors = {
    safe: "var(--color-safe)",
    sus: "var(--color-warn)",
    threat: "var(--color-danger)",
  };

  const level = $derived(levels[$gameState.currentLv]);
  const scoreObj = $derived(
    level?.scoreValues.find((s) => s.name === $gameState.lastButtonPressed),
  );

  // 1. Determine if the user was correct
  const isCorrect = $derived(scoreObj?.value === 1);

  const correctAnswer = $derived(level?.scoreValues.find((s) => s.value === 1));
  const correctColor = $derived(
    correctAnswer?.name
      ? (variantColors[correctAnswer.name] ?? "#999")
      : "#999",
  );

  // Dynamic border/accent theme color based on success/failure
  const themeColor = $derived(
    isCorrect ? "var(--color-safe, #22c55e)" : "var(--color-danger, #ef4444)",
  );
  const text = $derived(scoreObj?.feedback ?? "");
</script>

<Card>
  <div class="main" style="--theme-color: {themeColor};">
    <span class="level-badge">Level {$gameState.currentLv + 1}</span>

    <div class="content-wrapper">
      {#if isCorrect}
        <div class="status-icon success">
          {@html CheckIcon}
        </div>
        <h2 class="status-title success-text">Excellent Catch!</h2>
      {:else}
        <div class="status-icon failure">
          {@html ErrorIcon}
        </div>
        <h2 class="status-title failure-text">Threat Undetected!</h2>
      {/if}

      <p class="feedback-text">{text}</p>

      {#if !isCorrect && correctAnswer}
        <div class="solution-box" style="--badge-color: {correctColor}">
          <span class="solution-label">Correct Classification:</span>
          <span class="solution-badge">{correctAnswer.name.toUpperCase()}</span>
        </div>
      {/if}
    </div>

    <div class="button-container">
      <Button onclick={() => nextLevel()}>Next Level →</Button>
    </div>
  </div>
</Card>

<style>
  .main {
    border: solid 4px var(--theme-color);
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9),
      rgba(245, 245, 245, 0.3)
    );
    padding: 2rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    position: relative;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.02);
  }

  .level-badge {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    max-width: 580px;
    margin: 0 auto;
    padding: 1.5rem 0;
  }

  .status-icon {
    margin-bottom: 0.75rem;
    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .status-icon.success {
    color: var(--color-safe, #22c55e);
  }
  .status-icon.failure {
    color: var(--color-danger, #ef4444);
  }

  .status-title {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
  }

  .success-text {
    color: var(--color-safe, #15803d);
  }
  .failure-text {
    color: var(--color-danger, #b91c1c);
  }

  .feedback-text {
    font-size: 1.15rem;
    line-height: 1.6;
    color: #334155;
    margin: 0 0 1.5rem 0;
  }

  .solution-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.95rem;
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
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
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
</style>

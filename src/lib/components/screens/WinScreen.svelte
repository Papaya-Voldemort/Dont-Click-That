<script lang="ts">
  import Button from "../core/Button.svelte";
  import Card from "../core/Card.svelte";
  import { updateScreen, gameState, resetGame } from "../../stores/game";

  const score = $gameState.score;
  const outOf = $gameState.levels;
  const percent = Math.round((score / outOf) * 100);
  const missed = outOf - score;
  const resultMessage =
    percent === 100
      ? "Perfect score — you spotted every threat."
      : percent >= 70
        ? "Nice work — your scam radar is getting sharper."
        : "You finished the training — replay to sharpen your instincts.";
</script>

<Card noPadding>
  <div class="main textured-bg">
    <div class="badge">Training Complete</div>

    <div class="hero">
      <div class="score-ring" aria-label="Final score {score} out of {outOf}">
        <span>{score}</span>
        <small>/{outOf}</small>
      </div>

      <div class="summary">
        <h1>You Made It!</h1>
        <p>{resultMessage}</p>
      </div>
    </div>

    <div class="stats" aria-label="Training results">
      <div>
        <strong>{percent}%</strong>
        <span>Accuracy</span>
      </div>
      <div>
        <strong>{score}</strong>
        <span>Correct</span>
      </div>
      <div>
        <strong>{missed}</strong>
        <span>Missed</span>
      </div>
    </div>

    <p class="takeaway">Keep questioning links, senders, and anything that feels urgent or too good to be true.</p>

    <Button
      variant="success"
      size="lg"
      onclick={() => {
        updateScreen("splash");
        resetGame();
      }}>Play Again</Button
    >
  </div>
</Card>

<style>
  .main {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: clamp(0.75rem, 2vh, 1.5rem);
    width: 100%;
    height: 100%;
    padding: var(--card-padding);
    box-sizing: border-box;
    text-align: center;
    border-radius: inherit;
  }

  .textured-bg {
    background-color: #fafbfc;
    background-image:
      radial-gradient(circle at center, transparent 30%, #fafbfc 100%),
      linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
    background-size:
      100% 100%,
      24px 24px,
      24px 24px;
  }

  .badge {
    color: var(--color-success-dark);
    background: rgba(88, 204, 2, 0.12);
    border: 1px solid rgba(88, 204, 2, 0.22);
    border-radius: 999px;
    padding: 0.4rem 0.8rem;
    font-weight: 700;
    font-size: clamp(0.75rem, 1.8vw, 0.95rem);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 4vw, 2rem);
    max-width: 760px;
  }

  .score-ring {
    width: clamp(6rem, 18vw, 10rem);
    aspect-ratio: 1;
    border-radius: 50%;
    background: linear-gradient(145deg, var(--color-success), var(--color-success-dark));
    color: var(--text-inverted);
    display: grid;
    place-items: center;
    position: relative;
    box-shadow: 0 12px 0 rgba(70, 163, 2, 0.35);
    flex-shrink: 0;
  }

  .score-ring span {
    font-family: var(--display-font);
    font-size: clamp(2.75rem, 8vw, 5rem);
    line-height: 1;
    color: inherit;
  }

  .score-ring small {
    position: absolute;
    right: 1.1rem;
    bottom: 1.8rem;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-weight: 700;
  }

  .summary {
    text-align: left;
  }

  h1 {
    font-size: clamp(2.25rem, 6vw, 4.75rem);
    margin: 0;
    padding: 0;
    line-height: 0.95;
    color: var(--text-brand-dark);
  }

  p {
    margin: 0;
    color: var(--text-main);
    font-size: clamp(0.95rem, 2vw, 1.2rem);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    width: min(620px, 100%);
  }

  .stats div {
    background: var(--surface-primary);
    border: 1px solid var(--card-border);
    border-radius: 18px;
    padding: clamp(0.65rem, 2vw, 1rem);
    box-shadow: 0 4px 14px rgba(31, 41, 55, 0.08);
  }

  .stats strong {
    display: block;
    font-family: var(--display-font);
    font-size: clamp(1.35rem, 4vw, 2.15rem);
    line-height: 1;
    color: var(--text-dark-high);
  }

  .stats span {
    display: block;
    margin-top: 0.25rem;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    color: var(--text-main);
  }

  .takeaway {
    max-width: 680px;
    color: var(--text-secondary);
  }

  @media (max-width: 639px) {
    .hero {
      flex-direction: column;
    }

    .summary {
      text-align: center;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .main {
      gap: 0.4rem;
    }

    .hero {
      gap: 0.75rem;
    }

    .score-ring {
      width: 4.75rem;
      box-shadow: 0 6px 0 rgba(70, 163, 2, 0.35);
    }

    .score-ring span {
      font-size: 2.25rem;
    }

    .takeaway {
      display: none;
    }
  }
</style>

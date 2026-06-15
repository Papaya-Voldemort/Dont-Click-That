<script lang="ts">
  import Button from "../core/Button.svelte";
  import Card from "../core/Card.svelte";
  import { updateScreen, gameState, resetGame } from "../../stores/game";

  const score = $gameState.score;
  const outOf = $gameState.levels;
</script>

<Card>
  <div class="main">
    <h1>Congrats!</h1>
    <h2>You won!</h2>
    <span>Score {score}/{outOf}</span>
    <Button
      variant="success"
      size="lg"
      style="margin: 2rem"
      onclick={() => {
        updateScreen("splash");
        resetGame();
      }}>Play Again</Button
    >
  </div>
</Card>

<!-- Make the win screen look decent -->

<style>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 4rem;
    margin: 0;
    padding: 0;
  }

  h2 {
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }

  span {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    color: var(--text-main);
  }
</style>

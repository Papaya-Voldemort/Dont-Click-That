<script lang="ts">
  import Button from "../core/Button.svelte";
  import Card from "../core/Card.svelte";
  import { updateScreen } from "../../stores/game";

  const name = "Don't Click That!";
  const subtitle =
    "Train yourself to spot phishing links, scam emails, and suspicious messages through quick interactive challenges.";

  function pressBtn(screen: string) {
    updateScreen(screen);
  }
</script>

<Card>
  <div class="centered">
    <div class="text">
      <h1 class="title">{name}</h1>

      <p class="subtitle">
        {subtitle}
      </p>
    </div>

    <Button variant="success" size="xl" onclick={() => pressBtn("game")}
      >▶ Start Training</Button
    >

    <div class="actions">
      <Button variant="safe" size="md" onclick={() => pressBtn("how")}
        >How to Play</Button
      >
      <Button variant="default" size="md" onclick={() => pressBtn("Gameinfo")}
        >More Info</Button
      >
    </div>
  </div>
</Card>

<style>
  .centered {
    flex: 1;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    text-align: center;
    gap: var(--content-gap);
  }

  .text h1 {
    margin: 0;
    font-size: var(--heading-size);
    font-family: var(--display-font);
  }

  .text p {
    margin: 0 0 10px 0;
    font-size: var(--subtitle-size);
    color: var(--text-main);
    max-width: 75%;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--text-margin);
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--action-gap);
    width: 100%;
  }

  @media (min-width: 640px) {
    .actions {
      flex-direction: row;
      justify-content: center;
      width: auto;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .centered {
      justify-content: center;
      gap: calc(var(--content-gap) - 0.1rem);
    }

    .centered p {
      max-width: 90%;
      margin: 0;
    }

    .text {
      margin: 0;
      gap: 0;
    }
  }
</style>

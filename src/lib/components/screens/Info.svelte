<script>
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";

  import { updateScreen } from "../../stores/game";

  const name = "Info";
</script>

<Card>
  <div class="main">
    <div class="header">
      <h1>{name}</h1>
      <div>
        <Button
          variant="danger"
          size="md"
          style="width: 75px;"
          onclick={() => {
            updateScreen("splash");
          }}>X</Button
        >
      </div>
    </div>
    <p>
      Don't Click That is made for the Congressional App Challenge! I made it
      because I have several family members who have fallen victim to cyber
      scams and phishing. This Duolingo-inspired tool is designed to help
      prevent cyber attacks on families all around the world.
    </p>
  </div>
</Card>

<style>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
</style>

<!-- TODO: Maybe show what part of the url is sketchy with highlights? -->
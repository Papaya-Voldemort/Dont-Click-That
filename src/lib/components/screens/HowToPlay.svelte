<script>
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";

  import { updateScreen } from "../../stores/game";

  const name = "How to Play";
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
    <p>Coming soon... (with video prob)</p>
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

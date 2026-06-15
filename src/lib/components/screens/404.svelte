<script>
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";
  import { updateScreen } from "../../stores/game";
</script>

<Card>
  <div>
    <h1>404 Page not found...</h1>
    <Button size="lg" onclick={() => updateScreen("splash")}>Return Home</Button>
  </div>
</Card>

<style>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  h1 {
    font-size: 4rem;
  }
</style>

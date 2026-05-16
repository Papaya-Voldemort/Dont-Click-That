<script>
  import Card from "../core/Card.svelte";

  const name = "Game Screen";
</script>

<Card>
  <div class="main">
    <div class="inside left">
      <h1>{name}</h1>
      <p>Game content coming soon...</p>
    </div>
    <div class="inside right">
      <h1>{name}</h1>
      <p>Game content coming soon...</p>
    </div>
  </div>
</Card>

<style>
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .inside {
    flex: 1;
    width: 100%;
  }

</style>

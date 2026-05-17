<script>
  import Card from "../core/Card.svelte";

  const name = "Info";
</script>

<Card>
  <div>
    <h1>{name}</h1>
    <p>I made this because...</p>
  </div>
</Card>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

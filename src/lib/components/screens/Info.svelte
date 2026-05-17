<script>
  import Card from "../core/Card.svelte";

  const name = "Info";
</script>

<Card>
  <div>
    <h1>{name}</h1>
    <p>
      Don't Click That is made for the Congressional App Challenge! I made it
      because I have several family members who have fallen victim to cyber
      scams and phishing. This Duolingo-inspired tool is designed to help
      prevent cyber attacks on families all around the world.
    </p>
  </div>
</Card>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

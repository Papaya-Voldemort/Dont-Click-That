<script>
  import Card from "../core/Card.svelte";
  import Button from "../core/Button.svelte";

  let {
    name = "Game Screen",
    leftType = "url",
    rightType = "grade",
    ...props
  } = $props();

  const GradeBtns = [
    { label: "Safe", variant: "safe" },
    { label: "Suspicious", variant: "warn" },
    { label: "Phishing", variant: "danger" },
  ];
</script>

<Card>
  <div class="main">
    <div class="inside left">
      <h1>{name}</h1>
      <p>Game content coming soon...</p>
    </div>
    <div class="inside right">
      <h1>Grade This URL</h1>
      {#if rightType === "grade"}
        {#each GradeBtns as btn}
          <Button variant={btn.variant} size="hg" style="flex: 1; margin: 1rem 0;">{btn.label}</Button>
        {/each}
      {/if}
      <div class="btn"></div>
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

  .right {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
</style>

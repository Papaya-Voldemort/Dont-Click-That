<script>
  import SplashScreen from "./lib/components/screens/SplashScreen.svelte";
  import GameScreen from "./lib/components/screens/GameScreen.svelte";
  import { gameState } from "./lib/stores/game";
</script>

<svelte:head>
  <title>Don't Click That</title>
  <meta
    name="description"
    content="Don't Click That - Security Awareness App"
  />
</svelte:head>

<main>
  {#if $gameState.screen === "splash"}
    <SplashScreen />
  {:else if $gameState.screen === "game"}
    <GameScreen />
  {/if}
</main>

<style>
</style>

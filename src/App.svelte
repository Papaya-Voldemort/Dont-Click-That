<script>
  import SplashScreen from "./lib/components/screens/SplashScreen.svelte";
  import GameScreen from "./lib/components/screens/GameScreen.svelte";
  import HowToPlay from "./lib/components/screens/HowToPlay.svelte";
  import Info from "./lib/components/screens/Info.svelte";
  import WinScreen from "./lib/components/screens/WinScreen.svelte";

  import { gameState } from "./lib/stores/game"
  import { levels } from "./lib/stores/levels"
  import InfoScreen from "./lib/components/screens/InfoScreen.svelte";

  const currentLevel = levels[$gameState.currentLv]
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
  {:else if $gameState.screen === "how"}
    <HowToPlay />
  {:else if $gameState.screen === "Gameinfo"}
    <Info />
  {:else if $gameState.screen === "win"}
    <WinScreen />
  {:else if $gameState.screen === "info"}
    <InfoScreen />
  {/if}
</main>

<!-- TODO: Add Animations Next Time -->
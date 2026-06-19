<script>
  import SplashScreen from "./lib/components/screens/SplashScreen.svelte";
  import GameScreen from "./lib/components/screens/GameScreen.svelte";
  import HowToPlay from "./lib/components/screens/HowToPlay.svelte";
  import Info from "./lib/components/screens/Info.svelte";
  import WinScreen from "./lib/components/screens/WinScreen.svelte";
  import NotFound from "./lib/components/screens/404.svelte";
  import DeepDive from "./lib/components/screens/DeepDive.svelte";
  import InfoScreen from "./lib/components/screens/InfoScreen.svelte";

  import { gameState } from "./lib/stores/game";
  import { levels } from "./lib/stores/levels";

  import { slide } from "svelte/transition";

  const currentLevel = levels[$gameState.currentLv];
</script>

<svelte:head>
  <title>Don't Click That</title>
  <meta name="description" content="Don't Click That - Security Awareness App" />
</svelte:head>

<main>
  {#if $gameState.screen === "splash"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <SplashScreen />
    </div>
  {:else if $gameState.screen === "game"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <GameScreen />
    </div>
  {:else if $gameState.screen === "how"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <HowToPlay />
    </div>
  {:else if $gameState.screen === "gameInfo"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <Info />
    </div>
  {:else if $gameState.screen === "win"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <WinScreen />
    </div>
  {:else if $gameState.screen === "info"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <InfoScreen />
    </div>
  {:else if $gameState.screen === "deepDive"}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <DeepDive />
    </div>
  {:else}
    <div transition:slide={{ duration: 200 }} class="screen-wrapper">
      <NotFound />
    </div>
  {/if}
</main>

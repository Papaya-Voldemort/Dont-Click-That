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
  import { fade } from "svelte/transition";
  import { tick } from "svelte";

  let main;
  $effect(() => {
    const screen = $gameState.screen;
    tick().then(() => {
      if ($gameState.screen === screen) {
        main?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
  });
</script>

<svelte:head>
  <title>Don't Click That</title>
  <meta name="description" content="Don't Click That - Security Awareness App" />
</svelte:head>

<main bind:this={main} tabindex="-1">
  {#if $gameState.screen === "splash"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <SplashScreen />
    </div>
  {:else if $gameState.screen === "game"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <GameScreen />
    </div>
  {:else if $gameState.screen === "how"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <HowToPlay />
    </div>
  {:else if $gameState.screen === "gameInfo"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <Info />
    </div>
  {:else if $gameState.screen === "win"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <WinScreen />
    </div>
  {:else if $gameState.screen === "info"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <InfoScreen />
    </div>
  {:else if $gameState.screen === "deepDive"}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <DeepDive />
    </div>
  {:else}
    <div in:fade={{ duration: 160 }} class="screen-wrapper">
      <NotFound />
    </div>
  {/if}
</main>

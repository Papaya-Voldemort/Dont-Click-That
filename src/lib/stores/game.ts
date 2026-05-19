import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { levels } from './levels';

export const gameState = writable({
  screen: 'splash',
  levels: 3,
  currentLv: 0,
  score: 0,
});

export function updateScreen(screenName: string) {
  gameState.update(state => ({ ...state, screen: screenName }));
}

export function nextLevel() {
  if (get(gameState).levels - 1 === get(gameState).currentLv) {
    updateScreen("win");
    return
  }
  gameState.update(state => ({ ...state, currentLv: state.currentLv + 1 }));
}

export function updateScore(score: number) {
  gameState.update(state => ({ ...state, score: state.score + score }));
  console.log(get(gameState).score)
}
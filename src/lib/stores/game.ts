import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const gameState = writable({
  screen: 'splash',
  levels: 15,
  currentLv: 0,
  score: 0,
});

export function updateScreen(screenName: string) {
  gameState.update(state => ({ ...state, screen: screenName }));
}

export function nextLevel() {
  gameState.update(state => ({ ...state, currentLv: state.currentLv + 1 }));
}

export function updateScore(score: number) {
  gameState.update(state => ({ ...state, score: state.score + score }));
  console.log(get(gameState).score)
}
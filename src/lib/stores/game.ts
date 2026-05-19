import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import { levels } from './levels';

const levelCnt = levels.length;

export const gameState = writable({
  screen: 'splash',
  levels: levelCnt,
  currentLv: 0,
  score: 0,
  lastButtonPressed: '',
});

export function updateScreen(screenName: string) {
  gameState.update(state => ({ ...state, screen: screenName }));
}

export function nextLevel() {
  const currentState = get(gameState);
  if (currentState.currentLv >= currentState.levels - 1) {
    updateScreen("win");
    return;
  }
  gameState.update(state => ({ ...state, screen: "game"}))
  gameState.update(state => ({ ...state, currentLv: state.currentLv + 1 }));
}

export function updateScore(score: number) {
  gameState.update(state => ({ ...state, score: state.score + score }));
  console.log(get(gameState).score)
}

export function resetGame() {
  gameState.update(state => ({ ...state, currentLv: 0 }));
  console.log(get(gameState).currentLv)
}
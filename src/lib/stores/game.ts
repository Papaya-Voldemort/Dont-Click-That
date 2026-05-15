import { writable } from 'svelte/store';

export const gameState = writable({
  screen: 'splash'
});

export function updateScreen(screenName: string) {
  gameState.update(state => ({ ...state, screen: screenName }));
}
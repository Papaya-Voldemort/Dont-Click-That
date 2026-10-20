import { writable } from "svelte/store";
import { createTrainingLevels, demoLevels, type level } from "./levels";

export type GameMode = "training" | "demo";
type Screen = "splash" | "game" | "how" | "gameInfo" | "win" | "info" | "deepDive";

type GameState = {
  screen: Screen;
  mode: GameMode;
  challenges: level[];
  levels: number;
  currentLv: number;
  score: number;
  answers: { name: string; value: number }[];
  lastButtonPressed: string;
};

function initialState(mode: GameMode = "training"): GameState {
  const challenges = mode === "demo" ? demoLevels : createTrainingLevels();
  return {
    screen: "splash",
    mode,
    challenges,
    levels: challenges.length,
    currentLv: 0,
    score: 0,
    answers: [],
    lastButtonPressed: "",
  };
}

export const gameState = writable<GameState>(initialState());

export function updateScreen(screen: Screen) {
  gameState.update((state) => ({ ...state, screen }));
}

export function startGame(mode: GameMode = "training") {
  gameState.set({ ...initialState(mode), screen: "game" });
}

export function submitAnswer(name: string) {
  gameState.update((state) => {
    // A click on a departing screen must not score the same challenge twice.
    if (state.screen !== "game" || state.lastButtonPressed) return state;
    const answer = state.challenges[state.currentLv]?.scoreValues.find(
      (item) => item.name === name,
    );
    if (!answer) return state;
    return {
      ...state,
      screen: "info",
      score: state.score + answer.value,
      answers: [...state.answers, { name, value: answer.value }],
      lastButtonPressed: name,
    };
  });
}

export function nextLevel() {
  gameState.update((state) => {
    if (!["info", "deepDive"].includes(state.screen) || !state.lastButtonPressed) return state;
    if (state.currentLv >= state.levels - 1) {
      return { ...state, screen: "win", lastButtonPressed: "" };
    }
    return { ...state, screen: "game", currentLv: state.currentLv + 1, lastButtonPressed: "" };
  });
}

export function resetGame() {
  gameState.set(initialState());
}

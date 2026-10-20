import { beforeEach, describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import {
  gameState,
  nextLevel,
  resetGame,
  startGame,
  submitAnswer,
  updateScreen,
} from "../src/lib/stores/game";
import { demoLevels } from "../src/lib/stores/levels";

beforeEach(resetGame);

describe("training sessions", () => {
  test("scores only once when answers are clicked repeatedly", () => {
    startGame("demo");
    submitAnswer("threat");
    submitAnswer("threat");
    submitAnswer("safe");
    expect(get(gameState).score).toBe(1);
    expect(get(gameState).answers).toEqual([{ name: "threat", value: 1 }]);
    expect(get(gameState).lastButtonPressed).toBe("threat");
    expect(get(gameState).screen).toBe("info");
  });

  test("ignores invalid answers and does not skip unanswered challenges", () => {
    startGame("demo");
    submitAnswer("unknown");
    nextLevel();
    expect(get(gameState).currentLv).toBe(0);
    expect(get(gameState).score).toBe(0);
    expect(get(gameState).screen).toBe("game");
  });

  test("advances once from feedback or deep dive and finishes the demo", () => {
    startGame("demo");
    for (const name of ["threat", "safe", "sus"]) {
      submitAnswer(name);
      updateScreen("deepDive");
      nextLevel();
      const state = get(gameState);
      nextLevel();
      expect(get(gameState)).toEqual(state);
    }
    expect(get(gameState).screen).toBe("win");
    expect(get(gameState).score).toBe(3);
    expect(get(gameState).answers).toHaveLength(3);
  });

  test("keeps partial credit separate from a fully correct answer", () => {
    startGame("demo");
    submitAnswer("sus");
    nextLevel();
    submitAnswer("threat");
    nextLevel();
    submitAnswer("sus");
    nextLevel();
    const state = get(gameState);
    expect(state.score).toBe(1.5);
    expect(state.answers.map((answer) => answer.value)).toEqual([0.5, 0, 1]);
  });

  test("reset and restart clear every result and restore full training", () => {
    startGame("demo");
    submitAnswer("threat");
    resetGame();
    expect(get(gameState)).toMatchObject({
      screen: "splash",
      mode: "training",
      levels: 15,
      currentLv: 0,
      score: 0,
      answers: [],
      lastButtonPressed: "",
    });
    startGame();
    for (let i = 0; i < 15; i++) {
      const level = get(gameState).challenges[i];
      submitAnswer(level.scoreValues.find((answer) => answer.value === 1)!.name);
      nextLevel();
    }
    expect(get(gameState)).toMatchObject({ screen: "win", levels: 15, score: 15 });
    startGame("demo");
    expect(get(gameState)).toMatchObject({ screen: "game", levels: 3, score: 0, answers: [] });
    expect(get(gameState).challenges).toEqual(demoLevels);
  });
});

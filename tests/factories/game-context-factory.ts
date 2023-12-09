import { GameContext } from "../../src/game/game-context";

export function createMockedGameContext(
  overrides: Partial<GameContext>,
): GameContext {
  return {
    entities: [],
    areaDimension: { width: 1000, height: 1000 },
    keyPressed: {},
    ...overrides,
  } as GameContext;
}

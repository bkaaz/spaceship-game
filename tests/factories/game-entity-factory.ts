import { GameEntity } from "../../src/entities/game-entity";

export function createMockedGameEntity(
  overrides: Partial<GameEntity>,
): GameEntity {
  return {
    x: 0,
    y: 0,
    ...overrides,
  } as GameEntity;
}

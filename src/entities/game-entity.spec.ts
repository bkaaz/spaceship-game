import { GameContext } from "@src/game/game-context";
import { GameEntity } from "./game-entity";

const mockGameCtx = {} as GameContext; // This creates a type assertion for an empty object as GameContext

describe("GameEntity", () => {
  const mockBehavior = { update: jest.fn(), draw: jest.fn() };
  const initialProps = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    isCDEnabled: true,
  };

  test("should initialize with correct properties", () => {
    const entity = new GameEntity(mockBehavior, initialProps);
    expect(entity.x).toBe(0);
    expect(entity.y).toBe(0);
    expect(entity.width).toBe(10);
    expect(entity.height).toBe(10);
    expect(entity.isCDEnabled).toBe(true);
  });

  test("update calls behavior update", () => {
    const entity = new GameEntity(mockBehavior, initialProps);
    entity.update(mockGameCtx);
    expect(mockBehavior.update).toHaveBeenCalled();
  });
});

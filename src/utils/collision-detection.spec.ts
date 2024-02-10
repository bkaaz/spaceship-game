import { GameEntity } from "@src/entities/game-entity";
import { isEntityColliding } from "./collision-detection";

const mockBehavior = { update() {}, draw() {} };

describe("collision-detection", () => {
  test("isRectEntityColliding should return true for intersecting entities", () => {
    const entityA = new GameEntity(mockBehavior, {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      isCDEnabled: true,
    });
    const entityB = new GameEntity(mockBehavior, {
      x: 5,
      y: 5,
      width: 10,
      height: 10,
      isCDEnabled: true,
    });

    expect(isEntityColliding(entityA, entityB)).toBe(true);
  });

  test("isRectEntityColliding should return false for non-intersecting entities", () => {
    const entityA = new GameEntity(mockBehavior, {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      isCDEnabled: true,
    });
    const entityB = new GameEntity(mockBehavior, {
      x: 20,
      y: 20,
      width: 10,
      height: 10,
      isCDEnabled: true,
    });

    expect(isEntityColliding(entityA, entityB)).toBe(false);
  });
});

import { RectObstacleBehavior } from "@src/entities/behaviors/rect-obstacle-behavior";
import { GameEntity } from "@src/entities/game-entity";

export function createOverlay(
  x: number,
  y: number,
  width: number,
  height: number,
  color = "grey",
): GameEntity {
  const options = {
    x: x,
    y: y,
    width: width,
    height: height,
    isCDEnabled: false,
  };

  return new GameEntity(new RectObstacleBehavior(color), options);
}

import { RectObstacleBehavior } from "../entities/behaviors/rect-obstacle-behavior";
import { GameEntity } from "../entities/entity";

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

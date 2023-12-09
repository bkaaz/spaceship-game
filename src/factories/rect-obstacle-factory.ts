import { RectObstacleBehavior } from "@src/entities/behaviors/rect-obstacle-behavior";
import { GameEntity } from "@src/entities/entity";

export function createRectObstacle(
  x: number,
  y: number,
  width: number,
  height: number,
  color = "grey",
): GameEntity {
  const options = {
    x: x,
    y: y,
    width,
    height,
    isCDEnabled: true,
  };

  return new GameEntity(new RectObstacleBehavior(color), options);
}

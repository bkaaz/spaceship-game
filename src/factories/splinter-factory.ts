import { GameEntity } from "@src/entities/game-entity";
import { SplinterBehavior } from "@src/entities/behaviors/splinter-behavior";

export function createSplinter(
  x: number,
  y: number,
  velocityX: number,
  velocityY: number
): GameEntity {
  const options = {
    x: x,
    y: y,
    width: 3,
    height: 3,
    isCDEnabled: false,
  };
  return new GameEntity(new SplinterBehavior(velocityX, velocityY), options);
}

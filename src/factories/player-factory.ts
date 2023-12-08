import { PlayerBehavior } from "../entities/behaviors/player-behavior";
import { GameEntity } from "../entities/entity";

export function createPlayer(
  x: number,
  y: number,
  image: HTMLImageElement,
): GameEntity {
  const options = {
    x: x,
    y: y,
    width: image.width,
    height: image.height,
    isCDEnabled: true,
  };

  return new GameEntity(new PlayerBehavior(image), options);
}

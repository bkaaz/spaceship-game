import { colors } from "@src/consts";
import { AreaBehavior } from "@src/entities/behaviors/area-behavior";
import { GameEntity } from "@src/entities/game-entity";

export function createOverlay(
  x: number,
  y: number,
  width: number,
  height: number,
  color = colors.overlayBorder,
): GameEntity {
  const options = {
    x: x,
    y: y,
    width: width,
    height: height,
    isCDEnabled: false,
  };

  return new GameEntity(new AreaBehavior(color), options);
}

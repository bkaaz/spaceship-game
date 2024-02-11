import { GameEntity } from "@src/entities/game-entity";
import { ExplosionBehavior } from "@src/entities/behaviors/explosion-behavior";

export function createExplosion(x: number, y: number): GameEntity {
  const options = {
    x: x,
    y: y,
    width: 40,
    height: 40,
    isCDEnabled: false,
  };

  return new GameEntity(new ExplosionBehavior(), options);
}
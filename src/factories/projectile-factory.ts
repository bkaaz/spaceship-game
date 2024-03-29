import { ProjectileBehavior } from "@src/entities/behaviors/projectile-behavior";
import { GameEntity } from "@src/entities/game-entity";

export function createProjectile(
  originEntity: GameEntity,
  x: number,
  y: number,
  angle: number,
  velocity: number,
): GameEntity {
  const options = {
    x: x,
    y: y,
    width: 5,
    height: 5,
    isCDEnabled: false,
  };

  return new GameEntity(
    new ProjectileBehavior(originEntity, angle, velocity),
    options
  );
}

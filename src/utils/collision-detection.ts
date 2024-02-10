import { GameEntity } from "@src/entities/game-entity";
import { GameContext } from "@src/game/game-context";
import { Dimension } from "@src/types";

export const checkCollisions = (
  entity: GameEntity,
  gameCtx: GameContext,
) => {
  if (checkBoundaryCollision(entity, gameCtx.areaDimension)) {
    return true;
  }

  for (let i = 0; i < gameCtx.entities.length; i++) {
    if (
      gameCtx.entities[i] != entity &&
      gameCtx.entities[i].isCDEnabled &&
      isEntityColliding(entity, gameCtx.entities[i])
    ) {
      return true;
    }
  }
  return false;
};

export const isEntityColliding = (
  entity1: GameEntity,
  entity2: GameEntity,
) => {
  return (
    entity1.x < entity2.x + entity2.width &&
    entity1.x + entity1.width > entity2.x &&
    entity1.y < entity2.y + entity2.height &&
    entity1.y + entity1.height > entity2.y
  );
};

export const checkBoundaryCollision = (
  entity: GameEntity,
  areaDimension: Dimension,
): boolean => {
  const { x, y, width, height } = entity;
  return (
    x < 0 ||
    x + width > areaDimension.width ||
    y < 0 ||
    y + height > areaDimension.height
  );
};

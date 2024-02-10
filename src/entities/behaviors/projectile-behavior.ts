import { GameContext } from "@src/game/game-context";
import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";
import {
  checkBoundaryCollision,
  isEntityColliding,
} from "@src/utils/collision-detection";

export class ProjectileBehavior implements GameEntityBehavior {
  constructor(
    private originEntity: GameEntity,
    private velocityX: number,
    private velocityY: number
  ) {}

  update(entity: GameEntity, gameCtx: GameContext): void {
    entity.x += this.velocityX;
    entity.y += this.velocityY;

    for (let i = 0; i < gameCtx.entities.length; i++) {
      const target = gameCtx.entities[i];
      if (
        entity !== target &&
        this.originEntity !== target &&
        target.isCDEnabled &&
        isEntityColliding(entity, target)
      ) {
        entity.destroy();
        target.triggerHit(target);
      }
    }

    if (checkBoundaryCollision(entity, gameCtx.areaDimension)) {
      entity.destroy();
    }
  }

  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext
  ): void {
    canvasCtx.save();

    const x = entity.x - gameCtx.cameraPosition.x;
    const y = entity.y - gameCtx.cameraPosition.y;

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, entity.width / 2, 0, Math.PI * 2);
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();

    canvasCtx.restore();
  }
}

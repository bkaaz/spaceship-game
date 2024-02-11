import { GameContext } from "@src/game/game-context";
import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";
import {
  checkBoundaryCollision,
  isEntityColliding,
} from "@src/utils/collision-detection";
import { createExplosion } from "@src/factories/explosion-factory";
import { createSplinter } from "@src/factories/splinter-factory";

export class ProjectileBehavior implements GameEntityBehavior {
  constructor(
    private originEntity: GameEntity,
    private angle: number,
    private velocity: number
  ) {}

  update(entity: GameEntity, gameCtx: GameContext): void {
    entity.x += this.velocity * Math.cos(this.angle);
    entity.y += this.velocity * Math.sin(this.angle);

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
        this.showExplosion(entity, gameCtx);
      }
    }

    if (checkBoundaryCollision(entity, gameCtx.areaDimension)) {
      entity.destroy();
      this.showExplosion(entity, gameCtx);
    }
  }

  showExplosion(entity: GameEntity, gameCtx: GameContext) {
    gameCtx.addGameEntity(createExplosion(entity.x, entity.y));
    this.showSplinters(entity, gameCtx);
  }

  showSplinters(entity: GameEntity, gameCtx: GameContext) {
    const splinterCount = 4;
    const splinterVelocity = -10;
    const angleRange = { min: -60, max: 60 };

    Array.from({ length: splinterCount }).forEach(() => {
      const randomAngleOffset =
        Math.random() * (angleRange.max - angleRange.min) + angleRange.min;
      const splinterAngle = this.angle + (randomAngleOffset * Math.PI) / 180;

      const velocityX = splinterVelocity * Math.cos(splinterAngle);
      const velocityY = splinterVelocity * Math.sin(splinterAngle);

      gameCtx.addGameEntity(
        createSplinter(entity.x, entity.y, velocityX, velocityY)
      );
    });
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

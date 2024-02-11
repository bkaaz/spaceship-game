import { GameContext } from "@src/game/game-context";
import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";

export class SplinterBehavior implements GameEntityBehavior {
  private animationDuration = 200;
  private startTime: number;

  constructor(
    private velocityX: number,
    private velocityY: number
  ) {
    this.startTime = Date.now();
  }

  update(entity: GameEntity): void {
    entity.x += this.velocityX;
    entity.y += this.velocityY;

    if (Date.now() - this.startTime > this.animationDuration) {
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

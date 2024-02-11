import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";
import { GameContext } from "@src/game/game-context";

export class ExplosionBehavior implements GameEntityBehavior {
  private animationDuration = 300;
  private startTime: number;
  private growthRate = 150;

  constructor() {
    this.startTime = Date.now();
  }

  update(entity: GameEntity): void {
    if (Date.now() - this.startTime > this.animationDuration) {
      entity.destroy();
    }
  }

  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext
  ): void {
    const elapsedTime = Date.now() - this.startTime;
    const radius = (elapsedTime / 1000) * this.growthRate;

    const x = entity.x - gameCtx.cameraPosition.x;
    const y = entity.y - gameCtx.cameraPosition.y;

    canvasCtx.strokeStyle = "white";
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, Math.PI * 2);
    canvasCtx.stroke();
  }
}

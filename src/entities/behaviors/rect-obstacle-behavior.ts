import { GameContext } from "../../game/game-context";
import { GameEntity, GameEntityBehavior } from "../entity";

export class RectObstacleBehavior implements GameEntityBehavior {
  constructor(private color: string) {}

  update(): void {}

  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext,
  ): void {
    canvasCtx.save();

    const x = entity.x - gameCtx.cameraPosition.x;
    const y = entity.y - gameCtx.cameraPosition.y;

    canvasCtx.fillStyle = this.color;
    canvasCtx.fillRect(x, y, entity.width, entity.height);

    canvasCtx.restore();
  }
}

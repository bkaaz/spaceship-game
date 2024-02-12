import { GameContext } from "@src/game/game-context";
import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";

export class AreaBehavior implements GameEntityBehavior {
  constructor(private color: string) {}

  update(): void {}

  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext
  ): void {
    const x = entity.x - gameCtx.cameraPosition.x;
    const y = entity.y - gameCtx.cameraPosition.y;

    canvasCtx.save();

    canvasCtx.strokeStyle = this.color;
    canvasCtx.lineWidth = 3;
    canvasCtx.strokeRect(x, y, entity.width, entity.height);

    canvasCtx.restore();
  }
}

import { GameContext } from "@src/game/game-context";

export interface GameEntityBehavior {
  update(entity: GameEntity, gameCtx: GameContext): void;
  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext,
  ): void;
}

export interface GameEntityOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  isCDEnabled: boolean;
}

export class GameEntity {
  x: number;
  y: number;
  width: number;
  height: number;
  isCDEnabled: boolean;
  private behavior: GameEntityBehavior;

  constructor(behavior: GameEntityBehavior, options: GameEntityOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.isCDEnabled = options.isCDEnabled;
    this.behavior = behavior;
  }

  update(gameCtx: GameContext) {
    this.behavior.update(this, gameCtx);
  }

  draw(canvasCtx: CanvasRenderingContext2D, gameCtx: GameContext) {
    this.behavior.draw(this, canvasCtx, gameCtx);
  }
}

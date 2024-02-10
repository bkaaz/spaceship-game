import { GameEntity } from "@src/entities/game-entity";
import { GameContext } from "./game-context";

interface GameOptions {
  canvasCtx: CanvasRenderingContext2D;
  gameCtx: GameContext;
}

export class Game {
  private canvasCtx: CanvasRenderingContext2D;
  private gameCtx: GameContext;
  private mainEntity: GameEntity | null = null;

  constructor({ canvasCtx, gameCtx }: GameOptions) {
    this.canvasCtx = canvasCtx;
    this.gameCtx = gameCtx;
  }

  addGameEntity(entity: GameEntity) {
    this.gameCtx.addGameEntity(entity);
  }

  setMainEntity(player: GameEntity) {
    this.mainEntity = player;
  }

  runGameLoop() {
    if (!this.mainEntity) {
      throw new Error("The main entity has not been initialized");
    }
    this.clearCanvas();

    this.updateEntities();
    this.removeDestroyedEntities();
    this.updateCameraPosition();
    this.drawEntities();

    requestAnimationFrame(() => this.runGameLoop());
  }

  private clearCanvas() {
    const { width, height } = this.gameCtx.screenDimension;
    this.canvasCtx.clearRect(0, 0, width, height);
  }

  private updateEntities() {
    this.gameCtx.entities.forEach((entity) => {
      entity.update(this.gameCtx);
    });
  }

  private removeDestroyedEntities() {
    this.gameCtx.removeDestroyedEntities();
  }

  private updateCameraPosition() {
    if (this.mainEntity) {
      this.gameCtx.updateCameraPosition(this.mainEntity);
    }
  }

  private drawEntities() {
    this.gameCtx.entities.forEach((entity) => {
      entity.draw(this.canvasCtx, this.gameCtx);
    });
  }
}

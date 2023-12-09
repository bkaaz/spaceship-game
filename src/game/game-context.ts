import { GameEntity } from "@src/entities/entity";
import { Position, Dimension } from "@src/types";
import { KeyboardState, KeyboardHandler } from "@src/utils/keyboard-handler";
import { Camera } from "./camera";

export class GameContext {
  private gameEntities: GameEntity[] = [];
  private camera: Camera;
  private keyState: KeyboardState = {};

  get cameraPosition(): Position {
    return { x: this.camera.x, y: this.camera.y };
  }

  get screenDimension(): Dimension {
    return this.screen;
  }

  get areaDimension(): Dimension {
    return this.area;
  }

  get keyPressed(): KeyboardState {
    return this.keyState;
  }

  get entities(): GameEntity[] {
    return this.gameEntities;
  }

  constructor(
    private screen: Dimension,
    private area: Dimension,
    keyboardHandler: KeyboardHandler,
  ) {
    this.camera = new Camera(screen.width, screen.height);
    keyboardHandler.on("key-state-changed", (keyState: KeyboardState) => {
      this.keyState = keyState;
    });
  }

  addGameEntity(entity: GameEntity) {
    this.gameEntities.push(entity);
  }

  updateCameraPosition(entity: GameEntity) {
    this.camera.update(entity);
  }
}

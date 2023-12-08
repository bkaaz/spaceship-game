import { GameEntity } from "../entities/entity";
import { GameContext } from "./game-context";
import { KeyboardHandler } from "../utils/keyboard-handler";
import { Dimension } from "../types";

interface GameOptions {
    canvasCtx: CanvasRenderingContext2D,
    keyboardHandler: KeyboardHandler,
    screen: Dimension,
    area: Dimension,
}

export class Game {
    private canvasCtx: CanvasRenderingContext2D;
    private gameCtx: GameContext;
    private mainEntity: GameEntity | null = null;

    constructor({
        canvasCtx,
        keyboardHandler,
        screen,
        area,
    }: GameOptions
    ) {
        this.canvasCtx = canvasCtx;
        this.gameCtx = new GameContext(screen, area, keyboardHandler)
    }

    addGameEntity(entity: GameEntity) {
        this.gameCtx.addGameEntity(entity);
    }

    setMainEntity(player: GameEntity) {
        this.mainEntity = player;
    }

    runGameLoop() {
        if (!this.mainEntity) {
            throw new Error('The main entity has not been initialized');
        }
        this.clearCanvas();

        this.updateEntities();
        this.updateCameraPosition();
        this.drawEntities();

        requestAnimationFrame(() => this.runGameLoop());
    }

    private clearCanvas() {
        const { width, height } = this.gameCtx.screenDimension;
        this.canvasCtx.clearRect(0, 0, width, height);
    }

    private updateEntities() {
        this.gameCtx.entities.forEach((object) => {
            object.update(this.gameCtx)
        });
    }

    private updateCameraPosition() {
        if (this.mainEntity) {
            this.gameCtx.updateCameraPosition(this.mainEntity);
        }
    }

    private drawEntities() {
        this.gameCtx.entities.forEach((entity) => {
            entity.draw(this.canvasCtx, this.gameCtx)
        });
    }
}
import { Camera } from "./camera";
import { GameObject } from "./game-objects/types";
import { KeyboardHandler } from "./keyboard-handler";

export class Game {
    private gameObjects: GameObject[] = [];
    private player: GameObject | null = null
    private camera: Camera;
    private areaWidth = 1000;
    private areaHeight = 1000;

    constructor(
        private ctx: CanvasRenderingContext2D,
        private keyboardHandler: KeyboardHandler,
        private screenWidth: number,
        private screenHeight: number
    ) {
        this.camera = new Camera(this.screenWidth, this.screenHeight);
    }

    addGameObject(object: GameObject) {
        this.gameObjects.push(object);
    }

    setPlayer(object: GameObject) {
        this.player = object;
    }

    runGameLoop() {
        if (!this.player) {
            throw new Error('The Player object has not been initialized');
        }
        this.clearCanvas();

        this.updateObjects();
        this.checkObjectsCollisions();
        this.updateCameraPosition();
        this.drawObjects();

        requestAnimationFrame(() => this.runGameLoop());
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }

    private updateObjects() {
        this.gameObjects.forEach((object) => { object.update(this.keyboardHandler.keyPressed) });
    }

    private updateCameraPosition() {
        if (this.player) {
            this.camera.update(this.player.position);
        }
    }

    private drawObjects() {
        this.gameObjects.forEach((object) => { object.draw(this.ctx, this.camera.x, this.camera.y) });
    }

    private checkObjectsCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            const currentObject = this.gameObjects[i];
            if (currentObject.isCollidingWithScreenEdge(this.areaWidth, this.areaHeight)) {
                currentObject.handleCollision()
            }

            for (let j = i + 1; j < this.gameObjects.length; j++) {
                if (currentObject.isCollidingWith(this.gameObjects[j].position)) {
                    currentObject.handleCollision()
                }
            }
        }
    }
}
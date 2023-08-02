import { GameObject } from "./game-objects/types";
import { KeyboardHandler } from "./keyboard-handler";

export class Game {
    private gameObjects: GameObject[] = [];

    constructor(private ctx: CanvasRenderingContext2D, private keyboardHandler: KeyboardHandler, private screenWidth: number, private screenHeight: number) { }

    addGameObject(object: GameObject) {
        this.gameObjects.push(object);
    }

    runGameLoop() {
        this.clearCanvas();

        this.updateObjects();
        this.checkObjectsCollisions();
        this.drawObjects();

        requestAnimationFrame(() => this.runGameLoop());
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }

    private updateObjects() {
        this.gameObjects.forEach((object) => { object.update(this.keyboardHandler.keyPressed) });
    }

    private drawObjects() {
        this.gameObjects.forEach((object) => { object.draw(this.ctx) });
    }

    private checkObjectsCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            const currentObject = this.gameObjects[i];
            if (currentObject.isCollidingWithScreenEdge(this.screenWidth, this.screenHeight)) {
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
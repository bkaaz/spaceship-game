import { GameObject } from "./types";

export class Game {
    keyPressed: Record<string, boolean> = {}

    constructor(private ctx: CanvasRenderingContext2D, private canvas: HTMLCanvasElement) { }

    private gameObjects: GameObject[] = [];

    private keyDownHandler(event: KeyboardEvent) {
        this.keyPressed[event.key] = true;
    }

    private keyUpHandler(event: KeyboardEvent) {
        this.keyPressed[event.key] = false;
    }

    bindKeyEvents(element: Document) {
        element.addEventListener('keydown', (event) => { this.keyDownHandler(event) });
        element.addEventListener('keyup', (event) => { this.keyUpHandler(event) });
    }

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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private updateObjects() {
        this.gameObjects.forEach((object) => { object.update(this.keyPressed) });
    }

    private drawObjects() {
        this.gameObjects.forEach((object) => { object.draw(this.ctx) });
    }

    private checkObjectsCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            const object1 = this.gameObjects[i];
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                const object2 = this.gameObjects[j];
                const object1Position = object1.getPosition();
                const object2Position = object2.getPosition();
                if (
                    object1Position.x < object2Position.x + object2Position.width &&
                    object1Position.x + object1Position.width > object2Position.x &&
                    object1Position.y < object2Position.y + object2Position.height &&
                    object1Position.y + object1Position.height > object2Position.y
                ) {
                    object1.handleCollision()
                }
            }
        }
    }
}
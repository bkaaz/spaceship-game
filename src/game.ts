import { Player } from "./player";

export class Game {
    keyPressed: Record<string, boolean> = {}

    constructor(private ctx: CanvasRenderingContext2D, private canvas: HTMLCanvasElement) { }

    private objects: Player[] = [];

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

    addObject(object: Player) {
        this.objects.push(object);
    }

    runGameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach((object) => { object.update(this.keyPressed) });
        this.objects.forEach((object) => { object.draw(this.ctx) });

        requestAnimationFrame(() => this.runGameLoop());
    }
}
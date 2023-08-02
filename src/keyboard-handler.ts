import { KeyboardState } from "./types";

export class KeyboardHandler {
    private keyState: KeyboardState = {}

    get keyPressed() {
        return this.keyState;
    }

    setup() {
        document.addEventListener('keydown', (event) => { this.keyDownHandler(event) });
        document.addEventListener('keyup', (event) => { this.keyUpHandler(event) });
    }

    private keyDownHandler(event: KeyboardEvent) {
        this.keyState[event.key] = true;
    }

    private keyUpHandler(event: KeyboardEvent) {
        this.keyState[event.key] = false;
    }
}
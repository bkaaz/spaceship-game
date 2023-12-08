import EventEmitter from "eventemitter3";

export type KeyboardState = Record<string, boolean>;

export class KeyboardHandler extends EventEmitter {
    private keyState: KeyboardState = {}

    setup() {
        document.addEventListener('keydown', (event) => { this.keyDownHandler(event) });
        document.addEventListener('keyup', (event) => { this.keyUpHandler(event) });
    }

    private keyDownHandler(event: KeyboardEvent) {
        this.keyState[event.key] = true;
        this.emit('key-state-changed', this.keyState)
    }

    private keyUpHandler(event: KeyboardEvent) {
        this.keyState[event.key] = false;
        this.emit('key-state-changed', this.keyState)
    }
}
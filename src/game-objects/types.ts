import { KeyboardState } from "../types";

export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GameObject {
    update(keyPressed?: KeyboardState): void;
    draw(ctx: CanvasRenderingContext2D): void;
    getPosition(): Position;
    handleCollision(): void;
}

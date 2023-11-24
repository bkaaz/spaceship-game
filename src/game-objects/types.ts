import { KeyboardState } from "../types";

export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GameObject {
    get position(): Position;
    update(keyPressed: KeyboardState): void;
    draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number): void;
    handleCollision(): void;
    isCollidingWith(position: Position): boolean;
    isCollidingWithScreenEdge(screenWidth: number, screenHeight: number): boolean;
}

export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type KeyboardState = Record<string, boolean>;

export interface GameObject {
    update(keyPressed?: KeyboardState): void;
    draw(ctx: CanvasRenderingContext2D): void;
    getPosition(): Position;
    handleCollision(): void;
}

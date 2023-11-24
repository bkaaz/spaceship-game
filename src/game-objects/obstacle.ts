import { GameObject, Position } from "./types";

export class Obstacle implements GameObject {
    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
    ) { }

    private color = '#ccc'

    get position(): Position {
        return { x: this.x, y: this.y, width: this.width, height: this.height }
    }

    update() { }

    handleCollision() { }

    draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
        const x = this.x - cameraX;
        const y = this.y - cameraY;

        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.width, this.height);
    }

    isCollidingWith(): boolean {
        return false
    }

    isCollidingWithScreenEdge(): boolean {
        return false
    }
}
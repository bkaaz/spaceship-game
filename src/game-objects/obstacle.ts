import { GameObject, Position } from "../types";

export class Obstacle implements GameObject {
    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
    ) { }

    private color = '#ccc'

    getPosition(): Position {
        return { x: this.x, y: this.y, width: this.width, height: this.height }
    }

    update() { }

    handleCollision() { }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
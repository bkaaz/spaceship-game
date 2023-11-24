import { KeyboardState } from "../types";
import { GameObject, Position } from "./types";

export class Player implements GameObject {
    constructor(
        private x: number,
        private y: number,
        private image: HTMLImageElement
    ) { }

    private rotationSpeed = 0.1;
    private angle = 0;
    private velocity = 0;
    private maxVelocity = 5;
    private velocityDecay = 0.05;
    private acceleration = 0.2;

    get position(): Position {
        return { x: this.x - this.image.width / 2, y: this.y - this.image.height / 2, width: this.image.width, height: this.image.height }
    }

    update(keyPressed: KeyboardState) {
        if (keyPressed['ArrowUp']) {
            this.velocity += this.acceleration;
        } else if (keyPressed['ArrowDown']) {
            this.velocity -= this.acceleration;
        } else {
            if (Math.abs(this.velocity) > this.velocityDecay) {
                this.velocity -= Math.sign(this.velocity) * this.velocityDecay;
            } else {
                this.velocity = 0;
            }
        }

        this.velocity = Math.min(Math.max(this.velocity, -this.maxVelocity), this.maxVelocity);

        this.x += this.velocity * Math.cos(this.angle);
        this.y += this.velocity * Math.sin(this.angle);

        if (keyPressed['ArrowLeft']) {
            this.angle -= this.rotationSpeed;
        }
        if (keyPressed['ArrowRight']) {
            this.angle += this.rotationSpeed;
        }

    }

    handleCollision() {
        this.velocity = -this.velocity;
    }

    draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
        const x = this.x - cameraX;
        const y = this.y - cameraY;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);

        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);

        ctx.restore();
    }

    isCollidingWith({ x, y, width, height }: Position): boolean {
        return this.position.x < x + width &&
            this.position.x + this.position.width > x &&
            this.position.y < y + height &&
            this.position.y + this.position.height > y
    }

    isCollidingWithScreenEdge(screenWidth: number, screenHeight: number): boolean {
        return this.position.x < 0 ||
            this.position.x + this.position.width > screenWidth ||
            this.position.y < 0 ||
            this.position.y + this.position.height > screenHeight;
    }
}
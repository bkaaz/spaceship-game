import { Position } from "./game-objects/types";

export class Camera {
    x: number = 0;
    y: number = 0;
    width: number;
    height: number;

    constructor(
        screenWidth: number,
        screenHeight: number,
        private offset = 100
    ) {
        this.width = screenWidth;
        this.height = screenHeight;
    }

    update({ x, y }: Position) {
        if (x < this.x + this.offset) {
            this.x = x - this.offset;
        } else if (x > this.x + this.width - this.offset) {
            this.x = x - this.width + this.offset;
        }

        if (y < this.y + this.offset) {
            this.y = y - this.offset;
        } else if (y > this.y + this.height - this.offset) {
            this.y = y - this.height + this.offset;
        }
    }

}
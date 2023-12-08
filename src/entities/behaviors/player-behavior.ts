import { checkRectangleCollision  } from "../../utils/collision-detection";
import { GameContext } from "../../game/game-context";
import { GameEntity, GameEntityBehavior } from "../entity";

export class PlayerBehavior implements GameEntityBehavior {
  private rotationSpeed = 0.1;
  private angle = 0;
  private velocity = 0;
  private maxVelocity = 8;
  private velocityDecay = 0.05;
  private acceleration = 0.2;
  private image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    this.image = image;
  }

  update(entity: GameEntity, gameCtx: GameContext): void {
    if (gameCtx.keyPressed["ArrowUp"]) {
      this.velocity += this.acceleration;
    } else if (gameCtx.keyPressed["ArrowDown"]) {
      this.velocity -= this.acceleration;
    } else {
      if (Math.abs(this.velocity) > this.velocityDecay) {
        this.velocity -= Math.sign(this.velocity) * this.velocityDecay;
      } else {
        this.velocity = 0;
      }
    }

    this.velocity = Math.min(
      Math.max(this.velocity, -this.maxVelocity),
      this.maxVelocity
    );

    const previousX = entity.x;
    const previousY = entity.y;
    entity.x += this.velocity * Math.cos(this.angle);
    entity.y += this.velocity * Math.sin(this.angle);

    if (checkRectangleCollision (entity, gameCtx)) {
      entity.x = previousX;
      entity.y = previousY;
      this.velocity = -this.velocity;
    }

    if (gameCtx.keyPressed["ArrowLeft"]) {
      this.angle -= this.rotationSpeed;
    }
    if (gameCtx.keyPressed["ArrowRight"]) {
      this.angle += this.rotationSpeed;
    }
  }

  draw(
    entity: GameEntity,
    canvasCtx: CanvasRenderingContext2D,
    gameCtx: GameContext
  ): void {
    const x = entity.x - gameCtx.cameraPosition.x;
    const y = entity.y - gameCtx.cameraPosition.y;

    canvasCtx.save();
    canvasCtx.translate(x + this.image.width / 2, y + this.image.height / 2);
    canvasCtx.rotate(this.angle);

    canvasCtx.drawImage(
      this.image,
      -this.image.width / 2,
      -this.image.height / 2
    );

    canvasCtx.restore();
  }
}

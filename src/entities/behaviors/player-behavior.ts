import { GameContext } from "@src/game/game-context";
import { checkCollisions } from "@src/utils/collision-detection";
import { GameEntityBehavior, GameEntity } from "@src/entities/game-entity";
import { createProjectile } from "@src/factories/projectile-factory";

export class PlayerBehavior implements GameEntityBehavior {
  private rotationSpeed = 0.1;
  private angle = 0;
  private velocity = 0;
  private maxVelocity = 8;
  private velocityDecay = 0.05;
  private acceleration = 0.2;
  private image: HTMLImageElement;
  private shootDelay = 200;
  private lastShotTime = 0;

  constructor(image: HTMLImageElement) {
    this.image = image;
  }

  update(entity: GameEntity, gameCtx: GameContext): void {
    this.handleControls(entity, gameCtx);

    this.velocity = Math.min(
      Math.max(this.velocity, -this.maxVelocity),
      this.maxVelocity
    );

    const previousX = entity.x;
    const previousY = entity.y;
    entity.x += this.velocity * Math.cos(this.angle);
    entity.y += this.velocity * Math.sin(this.angle);

    if (checkCollisions(entity, gameCtx)) {
      entity.x = previousX;
      entity.y = previousY;
      this.velocity = -this.velocity;
    }
  }

  private handleControls(entity: GameEntity, gameCtx: GameContext) {
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

    if (gameCtx.keyPressed["ArrowLeft"]) {
      this.angle -= this.rotationSpeed;
    }
    if (gameCtx.keyPressed["ArrowRight"]) {
      this.angle += this.rotationSpeed;
    }

    if (
      (gameCtx.keyPressed["z"] || gameCtx.keyPressed["Z"]) &&
      this.canShoot()
    ) {
      this.shoot(entity, gameCtx);
    }
  }

  canShoot() {
    return Date.now() - this.lastShotTime >= this.shootDelay;
  }

  shoot(entity: GameEntity, gameCtx: GameContext) {
    const offset = 30;
    const projectileVelocity = 20;
    const projectileX =
      entity.x + entity.width / 2 + offset * Math.cos(this.angle);
    const projectileY =
      entity.y + entity.height / 2 + offset * Math.sin(this.angle);

    const projectile = createProjectile(
      entity,
      projectileX,
      projectileY,
      this.angle,
      projectileVelocity
    );
    gameCtx.addGameEntity(projectile);
    this.lastShotTime = Date.now();
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

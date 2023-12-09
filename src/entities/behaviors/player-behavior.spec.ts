import {
  createMockedGameContext,
  createMockedGameEntity,
  createMockedImage,
} from "@tests/factories";
import { GameEntity } from "@src/entities/entity";
import { GameContext } from "@src/game/game-context";
import { PlayerBehavior } from "./player-behavior";

describe("PlayerBehavior", () => {
  let mockEntity: GameEntity;
  let mockGameContext: GameContext;
  let playerBehavior: PlayerBehavior;

  beforeEach(() => {
    mockEntity = createMockedGameEntity({});
    mockGameContext = createMockedGameContext({});
    playerBehavior = new PlayerBehavior(createMockedImage({}));
  });

  test("Player moves forward when ArrowUp is pressed", () => {
    mockGameContext.keyPressed.ArrowUp = true;
    playerBehavior.update(mockEntity, mockGameContext);

    expect(mockEntity.x).toBeGreaterThan(0);
    expect(mockEntity.y).toBe(0);
  });
});

import {
  createMockedGameContext,
  createMockedGameEntity,
  createMockedImage,
} from "@tests/factories";
import { GameEntity } from "@src/entities/game-entity";
import { GameContext } from "@src/game/game-context";
import { PlayerBehavior } from "./player-behavior";
import { checkCollisions } from "@src/utils/collision-detection";

jest.mock("@src/utils/collision-detection", () => ({
  checkCollisions: jest.fn(),
}));

describe("PlayerBehavior", () => {
  const startingPositionX = 100;
  const startingPositionY = 100;

  let mockEntity: GameEntity;
  let mockGameContext: GameContext;
  let playerBehavior: PlayerBehavior;

  beforeEach(() => {
    mockEntity = createMockedGameEntity({
      x: startingPositionX,
      y: startingPositionY,
    });
    mockGameContext = createMockedGameContext({});
    playerBehavior = new PlayerBehavior(createMockedImage({}));
    (checkCollisions as jest.Mock).mockImplementation(() => false);
  });

  test("Player moves forward when ArrowUp is pressed", () => {
    mockGameContext.keyPressed.ArrowUp = true;
    playerBehavior.update(mockEntity, mockGameContext);

    expect(mockEntity.x).toBeGreaterThan(startingPositionX);
    expect(mockEntity.y).toBe(startingPositionY);
  });

  test("Player moves backward when ArrowDown is pressed", () => {
    mockGameContext.keyPressed.ArrowDown = true;
    playerBehavior.update(mockEntity, mockGameContext);

    expect(mockEntity.x).toBeLessThan(startingPositionX);
    expect(mockEntity.y).toBe(startingPositionY);
  });

  test("Player turns left when ArrowLeft is pressed", () => {
    mockGameContext.keyPressed.ArrowLeft = true;
    playerBehavior.update(mockEntity, mockGameContext);

    expect(playerBehavior["angle"]).toBeLessThan(0);
    expect(mockEntity.x).toBe(startingPositionX);
    expect(mockEntity.y).toBe(startingPositionY);
  });

  test("Player turns right when ArrowRight is pressed", () => {
    mockGameContext.keyPressed.ArrowRight = true;
    playerBehavior.update(mockEntity, mockGameContext);

    expect(playerBehavior["angle"]).toBeGreaterThan(0);
    expect(mockEntity.x).toBe(startingPositionX);
    expect(mockEntity.y).toBe(startingPositionY);
  });

  test("Player position should not change when there is collision and ArrowUp is pressed", () => {
    mockGameContext.keyPressed.ArrowUp = true;
    (checkCollisions as jest.Mock).mockImplementation(() => true);
    playerBehavior.update(mockEntity, mockGameContext);

    expect(mockEntity.x).toBe(startingPositionX);
    expect(mockEntity.y).toBe(startingPositionY);
  });
});

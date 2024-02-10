import { GameEntity } from "@src/entities/game-entity";
import { Game } from "@src/game/game";
import { GameContext } from "./game-context";

jest.useFakeTimers();
jest
  .spyOn(global, "requestAnimationFrame")
  .mockImplementation((cb) => setTimeout(cb, 0));

describe("Game", () => {
  let game: Game;
  const mockBehavior = {
    update: jest.fn(),
    draw: jest.fn(),
  };

  const mockEntity = new GameEntity(mockBehavior, {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    isCDEnabled: true,
  });

  const mockCanvasCtx = {
    clearRect: jest.fn(),
  } as unknown as CanvasRenderingContext2D;

  const mockGameCtx = {
    entities: [mockEntity],
    screenDimension: { width: 10, height: 10 },
    updateCameraPosition: jest.fn(),
    removeDestroyedEntities: jest.fn(),
  } as unknown as GameContext;

  beforeEach(() => {
    game = new Game({
      canvasCtx: mockCanvasCtx,
      gameCtx: mockGameCtx,
    });
  });

  test("runGameLoop calls update and draw methods", () => {
    game.setMainEntity(mockEntity);
    game.runGameLoop();

    jest.runOnlyPendingTimers();

    expect(mockBehavior.update).toHaveBeenCalled();
    expect(mockBehavior.draw).toHaveBeenCalled();
  });
});

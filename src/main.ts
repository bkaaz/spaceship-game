import "./style.css";
import spaceshipImg from "./assets/spaceship-1.png";
import { Game } from "./game/game";
import { KeyboardHandler } from "./utils/keyboard-handler";
import { createOverlay } from "./factories/overlay-factory";
import { createRectObstacle } from "./factories/rect-obstacle-factory";
import { createPlayer } from "./factories/player-factory";
import { preloadImages } from "./utils/preload-image";
import { GameContext } from "./game/game-context";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const images = await preloadImages([spaceshipImg]);

const keyboardHandler = new KeyboardHandler();
keyboardHandler.setup();

const screen = { width: canvas.width, height: canvas.height }
const area = { width: 1000, height: 1000 }
const gameCtx = new GameContext(screen, area, keyboardHandler);

const game = new Game({
  canvasCtx: ctx,
  gameCtx,
});
const player = createPlayer(100, 100, images[spaceshipImg]);
game.addGameEntity(createOverlay(0, 0, 1000, 1000));
game.addGameEntity(createRectObstacle(300, 300, 50, 50));
game.addGameEntity(player);
game.setMainEntity(player);
game.runGameLoop();

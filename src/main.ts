import './style.css'
import spaceshipImg from '../assets/spaceship-1.png'
import { preloadImages } from './utils';
import { Game } from './game';
import { Player } from './game-objects/player';
import { Obstacle } from './game-objects/obstacle';
import { KeyboardHandler } from './keyboard-handler';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const images = await preloadImages([spaceshipImg])

const keyboardHandler = new KeyboardHandler();
keyboardHandler.setup();

const game = new Game(ctx, keyboardHandler, canvas.width, canvas.height);
const player = new Player(100, 100, images[spaceshipImg])
game.addGameObject(player);
game.setPlayer(player);
game.addGameObject(new Obstacle(300, 300, 50, 50));
game.runGameLoop()

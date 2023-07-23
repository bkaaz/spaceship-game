import './style.css'
import spaceshipImg from '../assets/spaceship-1.png'
import { preloadImages } from './utils';
import { Game } from './game';
import { Player } from './player';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const images = await preloadImages([spaceshipImg])

const game = new Game(ctx, canvas);
game.bindKeyEvents(document);
game.addObject(new Player(100, 100, images[spaceshipImg]))
game.runGameLoop()

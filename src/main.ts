import './style.css'
import spaceshipImg from '../assets/spaceship-1.png'
import { preloadImages } from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const images = await preloadImages([spaceshipImg])
ctx.drawImage(images[spaceshipImg], 100, 100)

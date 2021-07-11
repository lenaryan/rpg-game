import './index.scss';
import Leah from './assets/leah.png';
import terrainAtlas from './assets/terrain.webp';
// import worldCfg from './configs/world.json';
// import sprite from './configs/sprites';
import ClientGame from './client/ClientGame';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasW = canvas.getAttribute('width');
const canvasH = canvas.getAttribute('height');

const skinW = 48;
const skinH = 48;

const startX = canvasW / 2 - skinW / 2;
const startY = canvasH / 2 - skinH / 2;

const shots = 3;
let cycle = 0;

let keyPressed = null;

let pX = startX;
let pY = startY;
let skin = 0;
const gap = 10;

function keyDownHandler(e) {
  keyPressed = e.key;
}

function keyUpHandler() {
  keyPressed = null;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Leah;

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

function walk() {
  switch (keyPressed) {
    case 'Down':
    case 'ArrowDown':
      if (pY < canvasH - skinH - gap) {
        pY += 10;
      }
      cycle = (cycle + 1) % shots;
      skin = 0;
      break;
    case 'Up':
    case 'ArrowUp':
      if (pY > gap) {
        pY -= 10;
      }
      cycle = (cycle + 1) % shots;
      skin = skinH * 3;
      break;
    case 'Left':
    case 'ArrowLeft':
      if (pX > gap) {
        pX -= 10;
      }
      cycle = (cycle + 1) % shots;
      skin = skinH;
      break;
    case 'Right':
    case 'ArrowRight':
      if (pX < canvasW - skinW - gap) {
        pX += 10;
      }
      cycle = (cycle + 1) % shots;
      skin = skinH * 2;
      break;
    default:
      break;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);

  ctx.drawImage(img, cycle * skinW, skin, skinW, skinH, pX, pY, skinW, skinH);

  window.requestAnimationFrame(walk);
}

img.addEventListener('load', () => {
  // ctx.drawImage(
  //   img,
  //   cycle * skinW,
  //   skin,
  //   skinW,
  //   skinH,
  //   startX,
  //   startY,
  //   skinW,
  //   skinH
  // );

  window.requestAnimationFrame(walk);
});

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

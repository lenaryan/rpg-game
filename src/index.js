import './index.scss';
import Leah from './assets/leah.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasW = canvas.getAttribute('width');
console.log("canvas.getAttribute('width')", canvas.getAttribute('width'));
const canvasH = canvas.getAttribute('height');

const spriteW = 48;
const spriteH = 48;

const startX = canvasW / 2 - spriteW / 2;
const startY = canvasH / 2 - spriteH / 2;

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

img.addEventListener('load', () => {
  ctx.drawImage(
    img,
    cycle * spriteW,
    skin,
    spriteW,
    spriteH,
    startX,
    startY,
    spriteW,
    spriteH
  );
  setInterval(() => {
    switch (keyPressed) {
      case 'Down':
      case 'ArrowDown':
        if (pY < canvasH - spriteH - gap) {
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
        skin = spriteH * 3;
        break;
      case 'Left':
      case 'ArrowLeft':
        if (pX > gap) {
          pX -= 10;
        }
        cycle = (cycle + 1) % shots;
        skin = spriteH;
        break;
      case 'Right':
      case 'ArrowRight':
        if (pX < canvasW - spriteW - gap) {
          pX += 10;
        }
        cycle = (cycle + 1) % shots;
        skin = spriteH * 2;
        break;
      default: break;
    }

    ctx.clearRect(0, 0, canvasW, canvasH);

    // background
    ctx.strokeStyle = 'peachpuff';
    ctx.lineWidth = 30;
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, canvasW, canvasH);

    for (let x = gap; x < canvasW / 2; x += 50) {
      ctx.strokeRect(x, x, canvasW - x * 2, canvasH - x * 2);
    }

    ctx.stroke();
    ctx.drawImage(
      img,
      cycle * spriteW,
      skin,
      spriteW,
      spriteH,
      pX,
      pY,
      spriteW,
      spriteH
    );
  }, 120);
});

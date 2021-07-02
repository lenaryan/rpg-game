import './index.scss';
import Leah from './assets/leah.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasW = 600;
const canvasH = 600;

const spriteW = 48;
const spriteH = 48;

const startX = canvasW / 2 - spriteW / 2;
const startY = canvasH / 2 - spriteH / 2;

const shots = 3;
let cycle = 0;
let bottomPressed = false;
let topPressed = false;
let leftPressed = false;
let rightPressed = false;
let pX = startX;
let pY = startY;
let skin = 0;
const gap = 10;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
  }

  if (e.key === 'Up' || e.key === 'ArrowUp') {
    topPressed = true;
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }

  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
  }

  if (e.key === 'Up' || e.key === 'ArrowUp') {
    topPressed = false;
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }

  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
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
    if (bottomPressed) {
      if (pY < canvasH - spriteH - gap) {
        pY += 10;
      }
      cycle = (cycle + 1) % shots;
      skin = 0;
    }

    if (topPressed) {
      if (pY > gap) {
        pY -= 10;
      }
      cycle = (cycle + 1) % shots;
      skin = spriteH * 3;
    }

    if (leftPressed) {
      if (pX > gap) {
        pX -= 10;
      }
      cycle = (cycle + 1) % shots;
      skin = spriteH;
    }

    if (rightPressed) {
      if (pX < canvasW - spriteW - gap) {
        pX += 10;
      }
      cycle = (cycle + 1) % shots;
      skin = spriteH * 2;
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

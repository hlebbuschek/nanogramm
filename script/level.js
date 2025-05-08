import {newLevels as levels} from "../data/data.js";

const urlParams = new URLSearchParams(window.location.search);
const levelId = parseInt(urlParams.get('id'));
let currentColor = 'blue';

export function loadLevel(levelId) {
  const level = levels.find(level => level.id === levelId);
  if (level) {
    document.querySelector('.game-table').innerHTML = '';
    level.createGameTable();
  }
}
window.addEventListener('DOMContentLoaded', () => {
  loadLevel(levelId);
  draw();
});

document.querySelectorAll('.menu')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      window.location.href = `index.html`;
    });
  });

document.querySelector('.red')
.addEventListener('click', () => {
  showActiveColor('red');
  currentColor = 'red';
});

document.querySelector('.blue')
.addEventListener('click', () => {
  showActiveColor('blue');
  currentColor = 'blue';
});

export function showActiveColor(color) {
  document.querySelectorAll('.active').forEach(element => {
    element.classList.remove('active');
  });
  const btn = document.querySelector(`.${color}`);
  btn.classList.add('active');
}

let CountRightCells = 0;
let lifes = 3;

function draw() {
  const RightCells = document.querySelectorAll('.true');
  document.querySelectorAll('.cell')
    .forEach(cell => {
      cell.addEventListener('click', () => {
      if (cell.classList.contains('blue') || cell.classList.contains('red')) return;
      if (!check(cell, currentColor)) {
        document.getElementById(`life-${lifes}`).src = 'img/heart-empty.png';
        lifes--;
        if (lifes === 0) activateModal('You lose!');
      } else {
        cell.classList.add(currentColor);
        if (currentColor === 'blue' && cell.classList.contains('true')) {
          CountRightCells++;
          if (CountRightCells === RightCells.length) activateModal('Well done!');
        }

      }
      });
  });
}

function check(cell, color) {
  if (color === 'blue' && cell.classList.contains('true')) return true;
  if (color === 'red' && cell.classList.contains('false')) return true;
  return false;
}


function activateModal(message) {
  document.querySelector('.message').innerText = message;
  document.querySelector('.modal').classList.add('active-modal');
  document.getElementById('again').addEventListener('click', () => {
    window.location.href = `level.html?id=${levelId}`;
  });
  
  document.getElementById('next').addEventListener('click', () => {
    window.location.href = `level.html?id=${levelId + 1}`;
  
  });
}
// import {newLevels as levels} from "../data/data.js";
import { accounts, findMatchingAccount } from "../data/accounts.js";
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const levelId = parseInt(urlParams.get('id'));
let currentColor = 'blue';
const currentUser = findMatchingAccount(username);
export function loadLevel(levelId) {
  const level = currentUser.levels[levelId - 1];

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
      window.location.href = `menu.html?username=${encodeURIComponent(username)}`;
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

  document.querySelectorAll('tr').forEach((tr, rowIndex) => {
    tr.querySelectorAll('.cell').forEach((cell, colIndex) => {
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
    });
  });

  const RightCells = document.querySelectorAll('.true');
  document.querySelectorAll('.cell')
    .forEach(cell => {
      cell.addEventListener('click', () => {
      if (cell.classList.contains('blue') || cell.classList.contains('red')) return;
      if (!check(cell, currentColor)) {
        if (currentColor === 'red') {
          cell.classList.add('blue');
        } else {
          cell.classList.add('red');
        }
        document.getElementById(`life-${lifes}`).src = 'img/heart-empty.png';
        lifes--;
        if (lifes === 0) activateModal('You lose!');
      } else {
        cell.classList.add(currentColor);
        if (currentColor === 'blue' && cell.classList.contains('true')) {
          CountRightCells++;

          checkAndFillRowCol(cell);

          if (CountRightCells === RightCells.length) {
            activateModal('Well done!');
            currentUser.levels[levelId].isOpen = true;
            console.log(JSON.stringify(currentUser.levels[levelId]));
            refreshAccounts();
          } 
        }
      }
      });
  });
}

function checkAndFillRowCol(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  const allCells = Array.from(document.querySelectorAll('.cell'));

  const rowCells = allCells.filter(c => parseInt(c.dataset.row) === row);
  const colCells = allCells.filter(c => parseInt(c.dataset.col) === col);

  // prüfen, ob alle "true"-Zellen in der Zeile "blue" sind
  const rowCompleted = rowCells.every(c =>
    !c.classList.contains('true') || c.classList.contains('blue')
  );

  if (rowCompleted) {
    rowCells.forEach(c => {
      if (c.classList.contains('false') && !c.classList.contains('red')) {
        c.classList.add('red');
      }
    });
  }

  const colCompleted = colCells.every(c =>
    !c.classList.contains('true') || c.classList.contains('blue')
  );

  if (colCompleted) {
    colCells.forEach(c => {
      if (c.classList.contains('false') && !c.classList.contains('red')) {
        c.classList.add('red');
      }
    });
  }
}


function refreshAccounts() {
  let newAccounts = accounts.map(acc => {
    if (acc.userName === currentUser.userName) return currentUser;
    return acc;
  });
  localStorage.setItem('accounts', JSON.stringify(newAccounts));
}

function check(cell, color) {
  if (color === 'blue' && cell.classList.contains('true')) return true;
  if (color === 'red' && cell.classList.contains('false')) return true;
  return false;
}

//timer setzen: 
function activateModal(message) {
  document.querySelector('.message').innerText = message;
  document.querySelector('.modal').classList.add('active-modal');
  document.getElementById('again').addEventListener('click', () => {
    window.location.href = `level.html?username=${encodeURIComponent(username)}&id=${levelId}`;
  });
  
  document.getElementById('next').addEventListener('click', () => {
    window.location.href = `level.html?username=${encodeURIComponent(username)}&id=${levelId + 1}`;  
  });
}
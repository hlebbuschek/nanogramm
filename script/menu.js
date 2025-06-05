import { findMatchingAccount } from "../data/accounts.js";
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const currentUser = findMatchingAccount(username);

document.querySelector('.levels').innerHTML = '';

function refreshMenuPage() {
  for (let colCounter = 1; colCounter <= 3; colCounter++) {
    const col = document.createElement('div');
    col.classList.add('column');
    col.id = colCounter;
    document.querySelector('.levels').appendChild(col);
  }
  const columns = document.querySelectorAll('.column');
  if (currentUser.levels) {
    currentUser.levels.forEach((level, index) => {
      const id = level.id ?? index + 1;

      const levelBox = document.createElement('div');
      levelBox.classList.add('level');
      levelBox.id = id;
          
      const pId = document.createElement('p');
      pId.innerText = `${id}`;
      levelBox.appendChild(pId);

      if (id !== 1 && !currentUser.levels[id - 1].isOpen) {
        const closeImg = document.createElement('img');
        closeImg.src = 'img/sperren.png';
        levelBox.appendChild(closeImg);
      }
      const columnIndex = (id - 1) % 3;
      columns[columnIndex].appendChild(levelBox);
    });
  }
}

refreshMenuPage();

document.querySelectorAll('.level').forEach((level) => {
  level.addEventListener('click', () => {
    const levelId = level.id;
    if (currentUser.levels[levelId - 1].isOpen) {
      window.location.href = `level.html?username=${encodeURIComponent(username)}&id=${levelId}`;
    }
  });
});

document.querySelector('.create').addEventListener('click', () => {
  window.location.href = `creator.html?username=${encodeURIComponent(username)}`;
});

document.querySelector('.log-out-btn')
  .addEventListener('click', () => {
    window.location.href = "index.html";
  });
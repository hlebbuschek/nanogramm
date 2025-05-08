// import { newLevels as levels } from "./data/data.js";
import {newLevels as levels} from "../data/data.js"
for (let colCounter = 1; colCounter <= 3; colCounter++) {
  const col = document.createElement('div');
  col.classList.add('column');
  col.id = colCounter;
  document.querySelector('.levels').appendChild(col);
}
const columns = document.querySelectorAll('.column');

levels.forEach((level, index) => {
  const id = level.id ?? index + 1;

  const levelBox = document.createElement('div');
  levelBox.classList.add('level');
  levelBox.id = id;
  
  
  const pId = document.createElement('p');
  pId.innerText = `${id}`;
  levelBox.appendChild(pId);

  const columnIndex = (id - 1) % 3;
  columns[columnIndex].appendChild(levelBox);
});

document.querySelectorAll('.level').forEach((level) => {
  level.addEventListener('click', () => {
    const levelId = level.id;
    window.location.href = `level.html?id=${levelId}`;
  });
});

document.querySelector('.create').addEventListener('click', () => {
  window.location.href = `creator.html`;
});

import { getHints } from "../data/data.js";
import { showActiveColor } from "./level.js";
import { findMatchingAccount } from "../data/accounts.js";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const matchingUser = findMatchingAccount(username);

class Size {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.id = `check-${rows}`;
    this.string = `${rows} x ${cols}`;
  }
  createOptions() {
    const box = document.createElement('div');
    box.classList.add(`box-${this.rows}`); 
    document.querySelector('.size').appendChild(box);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    checkBox.classList.add('check-box');
    checkBox.id = this.id;
    const label = document.createElement('label');
    label.for = this.string;
    document.querySelector(`.box-${this.rows}`).appendChild(checkBox);
    document.querySelector(`.box-${this.rows}`).innerHTML += `
    <label for="${checkBox.id}">${this.string}</label>`;
  }
  createTable() {
    document.querySelector('.net').innerHTML = '';
    let table = document.createElement('table');
    document.querySelector('.net').appendChild(table);
    for (let r = 0; r < this.rows; r++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < this.cols; c++) {
        const td = document.createElement('td');
        td.className = 'cell';
        tr.appendChild(td);
      }
      table.appendChild(tr)
    }
  }
}

const sizes = [
  new Size(4, 4),
  new Size(5, 5),
  new Size(6, 6),
  new Size(7, 7),
  new Size(8, 8),
  new Size(9, 9),
  new Size(10, 10),
];

for (let element of sizes) {
  element.createOptions()
}

document.querySelectorAll('.check-box').forEach((element) => {
  element.addEventListener('click', () => {
    let matchingItem;
    for (let item of sizes) {
      document.getElementById(item.id).checked = false;
      if (item.id === element.id) {
        matchingItem = item;
      }
    }
    document.getElementById(element.id).checked = true;
    matchingItem.createTable();
  });
});

function changeColor(color) {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.classList.toString().includes(' ')) {
        cell.classList = 'cell';
      }
      cell.classList.add(color);
    });
  });
}

document.querySelectorAll('.blue').forEach(btn => {
  btn.addEventListener('click', () => {
    showActiveColor('blue');
    changeColor('blue'); 
  });
});

document.querySelectorAll('.red').forEach(btn => {
  btn.addEventListener('click', () => {
    showActiveColor('red');
    changeColor('red'); 
  });
});

let timeoutId = null;

document.querySelector('.save-riddle').addEventListener('click', () => {
  const table = document.getElementsByTagName('tr');
  let tableArray = [];
  for (let rowsCount = 0; rowsCount < table.length; rowsCount++) {
    const row = table[rowsCount].cells;
    tableArray.push([]);
    for (let cellCounter = 0; cellCounter < row.length; cellCounter++) {
      const cell = row[cellCounter];
      const boolValue = filterClasses(cell.className);
      tableArray[rowsCount].push(boolValue);
    }
  }
  if (checkingRiddle(tableArray)) {
    //push level to matchingaccount.levels!!!
    matchingUser.levels.push(tableArray);
    // localStorage.setItem('levels', JSON.stringify(levels));
    // document.querySelector('.saved').classList.add('show-saved');
    document.querySelector('.save-riddle').innerHTML = 'Saved';
    clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document.querySelector('.save-riddle').innerHTML = 'Save';
        // document.querySelector('.saved').classList.remove("show-saved");
      }, 2000);
  } else {
    alert(`Invalid riddle!`)
  }
  
});

function filterClasses(classes) {
  let color = '';
  if (classes.includes(' ')) {
    color = classes.slice(classes.indexOf(' ') + 1);
    if (color === 'blue') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function checkingRiddle(table) {
  const rowHints = table.map(row => getHints(row));
  const colCount = table[0].length;
  const colHints = [];

  for (let col = 0; col < colCount; col++) {
    const colArray = table.map(row => row[col]);
    colHints.push(getHints(colArray));
  }
  if (checkArray(rowHints) || checkArray(colHints)) {
    return false;
  }
  return true;
}

function checkArray(array) {
  return array.some(item => item.includes(0));
}

document.querySelectorAll('.menu')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      window.location.href = `menu.html?username=${encodeURIComponent(username)}`;
    });
  });
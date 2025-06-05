export function getHints(line) {
  const hints = [];
  let count = 0;
  for (let val of line) {
    if (val) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }
  if (count > 0) hints.push(count);
  return hints.length > 0 ? hints : [0];
}

export class Level {
  constructor(id, table, isOpen = false) {
    const raw = table?.solution || table?.table || table;
    this.id = id;
    this.solution = raw;
    if (!Array.isArray(this.solution)) {
      throw new Error(`Invalid level data for level ${id}`);
    }
    this.rowsHint = this.getRowHints();
    this.colsHint = this.getColHints();
    this.isOpen = id === 1 ? true : isOpen;
  }

  getRowHints() {
    return this.solution.map(row => getHints(row));
  }
  getColHints() {
    const colCount = this.solution[0].length;
    const colHints = [];

    for (let col = 0; col < colCount; col++) {
      const colArray = this.solution.map(row => row[col]);
      colHints.push(getHints(colArray));
    }
    return colHints;
  }

  createGameTable() {
    const table = document.createElement('table');
    const caption = table.createCaption();
    caption.textContent = `Level ${this.id}`;
    document.querySelector('.game-table').appendChild(table);
    let headRow = `<th></th>`;
    for (let i = 0; i < this.colsHint.length; i++) {
      const str = this.colsHint[i].join('<br>');
      headRow += `<th>${str}</th>`;
    }
    const Thead = table.createTHead();
    const headTr = Thead.insertRow();
    headTr.innerHTML = headRow;
    const Tbody = table.createTBody(); 
    for (let rowsCounter = 0; rowsCounter < this.rowsHint.length; rowsCounter++) {
      const row = document.createElement('tr');
      
      let html = ``;
      for (let colcounter = 0; colcounter < this.colsHint.length; colcounter++) {
        const cellClass = this.solution[rowsCounter][colcounter] ? 'cell true' : 'cell false';
        html += `<td class="${cellClass}"></td>`;
      }
      
      row.innerHTML = `
        <th>${this.rowsHint[rowsCounter].toString().replaceAll(',', '\n')}</th>
        ${html}`;
      table.appendChild(row);
    };
  }
}
export const baselvls = [
  {
    id: 1,
    table: [[true,false,true,false],[false,true,true,true],[false,true,false,false],[true,true,false,true]]},
  {
    id: 2,
    table: [[false,true,false,true],[true,true,true,false],[false,true,true,true],[true,false,true,false]]},
  {
    id: 3,
    table: [[true,true,true,false],[false,true,true,true],[false,true,false,true],[true,true,true,true]]},
  {
    id: 4,
    table: [[false,false,true,false,true],[false,true,true,true,false],[true,true,true,true,true],[true,true,true,true,false],[false,true,true,false,false]]
  },
  {
    id: 5,
    table: [[false,true,true,false,false],[true,true,false,true,false],[false,true,true,true,false],[false,true,false,false,true],[true,true,true,true,true]]},
  {
    id: 6,
    table: [[false,false,true,false,true],[false,true,true,true,false],[true,true,true,true,true],[true,true,true,true,false],[false,true,true,false,false]]},
  {
    id: 7,
    table: [[false,false,true,true,false,false],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,false,true,true,false,false]]},
  {
    id: 8,
    table: [[false,true,false,false,false,true,false],[true,false,true,false,true,false,true],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[true,true,true,true,true,true,true],[false,true,false,false,false,true,false]]
  },
  {
    id: 9,
    table: [[true,false,true,true,true,true],[false,true,false,true,false,false],[true,true,true,true,true,true],[false,true,false,true,false,true],[true,true,true,true,true,true],[false,true,false,true,false,true]]
  },
  {
    id: 10,
    table: [[false,false,true,true,false,false],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,true,true,true,true,false],[true,true,true,true,true,true],[false,false,true,true,false,false]]},
  {
    id: 11,
    table: [[false,true,true,false,false,false,false,false],[false,true,true,false,false,false,false,true],[true,false,true,false,false,false,true,true],[false,true,true,false,false,false,true,false],[false,true,true,false,false,true,true,false],[false,true,true,true,true,true,true,false],[false,true,true,true,true,true,false,false],[false,true,false,true,false,true,false,false]]},
  {
    id: 12,
    table: [[false,false,true,false,false,false,true],[false,true,true,true,true,true,false],[true,true,true,false,false,true,false],[false,true,false,true,false,true,false],[true,true,true,false,true,true,true],[false,true,true,true,true,true,false],[true,false,true,false,true,false,false]]},
  {
    id: 13,
    table: [[false,true,false,false,false,true,false],[true,false,true,false,true,false,true],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[false,true,true,true,true,true,false],[true,true,true,true,true,true,true],[false,true,false,false,false,true,false]]},
];
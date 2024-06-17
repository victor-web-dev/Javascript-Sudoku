const createElement = (tag) => document.createElement(tag);

const validNumber = (event) => {
  event.preventDefault();
  const { keyCode, key, target } = event;
  if (keyCode >= 48 && keyCode <= 57) return (target.value = key);
};

const tabHandler = (event) => {
  const { keyCode, target } = event;
  const {
    parentElement: { nextSibling, parentElement },
  } = target;
  if (keyCode == 9 && nextSibling) {
    return nextSibling.firstChild.focus();
  } else if (!nextSibling && !!parentElement.nextSibling) {
    return parentElement.nextSibling.firstChild.firstChild.focus();
  }
};

const createSudokuTable = () => {
  //Create Table
  const table = createElement("table");
  table.setAttribute("cellspacing", "0");
  table.setAttribute("cellpadding", "0");

  //Create Table Caption
  const tCaption = createElement("caption");
  tCaption.innerText = "Sudoku";

  //Create Table Header
  const tHead = createElement("thead");
  const tHeader = createElement("th");
  const tHeadRow = createElement("tr");
  const tHeaderBtn = createElement("button");
  tHeaderBtn.innerText = "Fill Up Numbers";

  tHeader.setAttribute("colspan", 3);
  tHeader.classList.add("p-1");

  tHeaderBtn.classList.add("p-1");

  tHeader.append(tHeaderBtn);
  tHeadRow.append(tHeader);
  tHead.append(tHeadRow);

  //Create Table body and inputs
  const tBody = createElement("tbody");

  for (let i = 1; i <= 9; i++) {
    let tableRow = createElement("tr");

    for (let j = 1; j <= 9; j++) {
      let tableData = createElement("td");
      let input = createElement("input");
      input.type = "text";
      input.classList.add("input");
      input.id = `${i}${j}`;
      input.placeholder = "0";
      input.value = 0;
      input.addEventListener("keydown", validNumber);
      input.addEventListener("keydown", tabHandler);
      if (j % 3 === 0) input.classList.add("lineY");
      if (i % 3 === 0) input.classList.add("lineI");
      tableData.append(input);
      tableRow.append(tableData);
    }

    tBody.append(tableRow);
  }
  table.classList.add("table");
  table.append(tCaption, tHead, tBody);
  document.querySelector("main").appendChild(table);
};

export const exec = () => {
  createSudokuTable();
};

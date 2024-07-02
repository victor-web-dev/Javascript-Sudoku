import {
  generateSudoku,
  rowValues,
  colValues,
  getAllBlocks,
} from "./matrix.js";

let answerSudoku;
let selectNum = null;
let errorFlag = "clear";
let duplicateFlag = false;
const min = 0;
const max = 8;
let fillNum = 35;
let missCounter = 0;
let hintCounter = 0;

let matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const createElement = (tag) => document.createElement(tag);

// validate keyboard numbers
const validNumber = (event) => {
  event.preventDefault();
  const { keyCode, key, target } = event;
  if (keyCode >= 48 && keyCode <= 57) return (target.value = key); // numbers 0 - 9
  if (keyCode == 8) return (target.value = ""); // backspace
};

//return input by id
const getInput = (i, j) => {
  return document.getElementById(`${i}${j}`);
};

// recursively return next valid input and focus
const getNextInputId = (row, col) => {
  let inputRow = row;
  let inputCol = col + 1;

  if (inputCol === 9 && inputRow < 9) {
    inputRow += 1;
    inputCol = 0;
  }

  let el = getInput(inputRow, inputCol);

  if (!el) {
    return;
  }

  if (el.disabled) {
    return getNextInputId(inputRow, inputCol);
  }

  return el ? el.focus() : -1;
};

// handle Tab button
const tabHandler = (event) => {
  event.preventDefault();
  const { keyCode, target } = event;
  let inputId = target.id;
  if (keyCode == 9) {
    getNextInputId(parseInt(inputId.charAt(0)), parseInt(inputId.charAt(1)));
  }
};

//Get the Input Values and add to the matrix
const handleChangeInputValue = (event) => {
  const { target, keyCode } = event;
  if (keyCode == 8 || keyCode == 9) return; //backspace and tab
  const row = target.id.charAt(0); //get the position
  const col = target.id.charAt(1); //get the position
  matrix[row][col] = parseInt(target.value);
  return;
};

//Solver Button
const solveSudoku = (event) => {
  const arr = answerSudoku;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const input = document.getElementById(`${i}${j}`);
      input.value = arr[i][j];
    }
  }
};

//make rundom number
const randomNumber = () => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
//get and input random Index
const getKeyNumbers = () => {
  console.table(answerSudoku);
  const usedIDs = Array.from({ length: 9 }, () => Array(9).fill(false)); //Array for checking
  for (let idx = 0; idx < fillNum; idx++) {
    let keyRow, keyCol;
    do {
      keyRow = randomNumber();
      keyCol = randomNumber();
    } while (usedIDs[keyRow][keyCol]); //check dupulicated combination of [keyRow][keyCol]
    usedIDs[keyRow][keyCol] = true; //mark used
    // console.log(`${keyRow} ${keyCol} ${answerSudoku[keyRow][keyCol]}`);
    const inputKey = document.getElementById(`${keyRow}${keyCol}`);
    inputKey.value = answerSudoku[keyRow][keyCol]; //input answer digit to same position of input cell
    inputKey.classList.add("keyNumber"); //add class for changing bg-color
    inputKey.setAttribute("disabled", "");
  }
};

//Create Table
const createSudokuTable = () => {
  //create buttons to choose level"
  const div = createElement("div");
  div.classList.add("button-container");
  for (let idx = 0; idx < 3; idx++) {
    const levelBtn = createElement("button");
    levelBtn.classList.add("button-level");
    levelBtn.classList.add("p-1");
    switch (idx) {
      case 0:
        levelBtn.innerText = "EASY";
        levelBtn.addEventListener("click", () => {
          fillNum = 45;
          newGame();
        });
        break;
      case 1:
        levelBtn.innerText = "NORMAL";
        levelBtn.addEventListener("click", () => {
          fillNum = 35;
          newGame();
        });
        break;
      case 2:
        levelBtn.innerText = "HARD";
        levelBtn.addEventListener("click", () => {
          fillNum = 20;
          newGame();
        });
        break;
    }
    div.append(levelBtn);
  }
  document.querySelector("main").appendChild(div);

  const table = createElement("table");
  table.setAttribute("cellspacing", "0");
  table.setAttribute("cellpadding", "0");

  //Create Table Caption
  const tCaption = createElement("caption");
  tCaption.innerText = "Sudoku";

  //Create Table Header
  const tHead = createElement("thead");
  const textarray = ["Fill Up Numbers", "New Game", "Hint"];
  const tHeadRow = createElement("tr");
  for (let idx = 0; idx < 3; idx++) {
    const tHeader = createElement("th");
    const tHeaderBtn = createElement("button");
    tHeaderBtn.classList.add("button-primary");
    tHeaderBtn.innerText = textarray[idx];
    tHeader.setAttribute("colspan", 3);
    tHeader.classList.add("p-1");
    tHeaderBtn.classList.add("p-1");
    switch (idx) {
      case 0: //answer
        tHeaderBtn.addEventListener("click", solveSudoku);
        break;
      case 1: //newgame
        tHeaderBtn.addEventListener("click", newGame);
        break;
      case 2: //hint
        const tmpFillNum = fillNum;
        tHeaderBtn.addEventListener("click", () => {
          fillNum = 1;
          getKeyNumbers();
          fillNum = tmpFillNum;
          hintCounter++;
          currentCounter();
        });
        break;
    }
    tHeader.append(tHeaderBtn);
    tHeadRow.append(tHeader);
    tHead.append(tHeadRow);
  }

  //Create Table body and inputs
  const tBody = createElement("tbody");
  for (let i = 0; i < 9; i++) {
    let tableRow = createElement("tr");

    for (let j = 0; j < 9; j++) {
      let tableData = createElement("td");
      let input = createElement("input");
      input.type = "text";
      input.classList.add("input");
      input.id = `${i}${j}`;
      input.placeholder = "0";
      input.value = 0;
      input.addEventListener("keydown", validNumber);
      input.addEventListener("keydown", tabHandler);
      input.addEventListener("keydown", (event) => {
        if (event.keyCode == 9) {
          //press tabs
          return;
        } else if (event.keyCode == 8) {
          //prsss backspace
          document.getElementById(`${i}${j}`).classList.remove("duplicate"); // Reset style
        } else {
          matrix = currentTable(); //renew table info
          console.table(matrix); //show
          const allBlocks = getAllBlocks(matrix);
          const blockIndex = getBlockIndex(i + 1, j + 1);
          const blockData = allBlocks[blockIndex + 1];
          const blockCheckingArrays = blockData.slice();
          const rowCheckingArray = rowValues(matrix, i);
          const colCheckingArray = colValues(matrix, j);
          checkDuplicate(
            event,
            `${i}${j}`,
            rowCheckingArray,
            colCheckingArray,
            blockCheckingArrays
          );
        }
      });
      input.addEventListener("keydown", handleChangeInputValue);
      if ((j + 1) % 3 === 0) input.classList.add("lineY");
      if ((i + 1) % 3 === 0) input.classList.add("lineI");
      tableData.append(input);
      tableRow.append(tableData);
    }

    tBody.append(tableRow);
  }
  table.classList.add("table");
  table.append(tCaption, tHead, tBody);
  document.querySelector("main").appendChild(table);

  //disply counter
  const counterDiv = createElement("div");
  counterDiv.classList.add("counter-container");
  for (let idx = 0; idx < 2; idx++) {
    const counterHeader = createElement("h2");
    counterHeader.classList.add("p-1");
    switch (idx) {
      case 0:
        counterHeader.innerText = `MISS COUNTER: ${missCounter}`;
        counterHeader.classList.add("miss-counter");
        break;
      case 1:
        counterHeader.innerText = `HINT COUNTER: ${hintCounter}`;
        counterHeader.classList.add("hint-counter");
        break;
    }
    counterDiv.append(counterHeader);
  }
  document.querySelector("main").appendChild(counterDiv);
};

//renew counter info
const currentCounter = () => {
  const missH2 = document.querySelector(".miss-counter");
  const hintH2 = document.querySelector(".hint-counter");
  console.log(missCounter);
  missH2.innerText = `MISS COUNTER: ${missCounter}`;
  hintH2.innerText = `HINT COUNTER: ${hintCounter}`;
};

// Method to get block index
const getBlockIndex = (i, j) => {
  return Math.floor((i - 1) / 3) * 3 + Math.floor((j - 1) / 3);
};

// Method to check duplicated
const checkDuplicate = (
  event,
  id,
  rowCheckingArray,
  colCheckingArray,
  blockCheckingArray
) => {
  const row = parseInt(id.charAt(0));
  const col = parseInt(id.charAt(1));
  let inputElement = document.getElementById(id);
  const { keyCode, target } = event;
  inputElement.classList.remove("duplicate"); // Reset style
  selectNum = parseInt(target.value.trim());
  if (selectNum === "0") {
    //first
    return;
  }
  let rowDuplicate = checkArray(rowCheckingArray, selectNum);
  let colDuplicate = checkArray(colCheckingArray, selectNum);
  let blockDuplicate = checkArray(blockCheckingArray, selectNum);
  if (rowDuplicate || colDuplicate || blockDuplicate) {
    // If duplicated
    event.preventDefault();
    missCounter++;
    currentCounter();
    inputElement.classList.add("duplicate"); // Apply duplicate style
    console.log(`Row: ${rowDuplicate}`);
    console.log(`Col: ${colDuplicate}`);
    console.log(`Block: ${blockDuplicate}`);
    displayWarning(); // Display warning message
  } else {
    // No duplicates
    console.log(`Number: ${selectNum} Place: ${id}`); //show Position
    console.log(`Row Array: ${rowCheckingArray}`); //show row Array
    console.log(`Col Array: ${colCheckingArray}`); //show row Array
    console.log(`Block Array: ${blockCheckingArray}`); //show Block Array
  }
};

//Check if number is dureplicated
const checkArray = (array, checkNum) => {
  // Count occurrences of checkNum in array
  let count = array.reduce((acc, val) => {
    return acc + (val === checkNum ? 1 : 0);
  }, 0);
  return count >= 2; // Return true if checkNum appears 2 or more times
};

//Get current table cell
const currentTable = () => {
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tr");
  const matrix = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowValues = Array.from(cells).map((cell) => {
      const inputValue = cell.querySelector("input").value.trim();
      return inputValue !== "" ? parseInt(inputValue) : 0; // 数値に変換できない場合は 0 を返す
    });
    matrix.push(rowValues);
  });

  return matrix.filter((row) => row.length); // 長さが 0 の配列をフィルタリング
};

// Display warning message
const displayWarning = () => {
  const warningElement = document.querySelector(".warning");
  warningElement.style.display = "block";
  setTimeout(() => {
    warningElement.style.display = "none";
  }, 1000);
};

//Handle button for selceting level
const levelButtonHandler = () => {
  document.querySelectorAll(".button-level").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".button-level").forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
        }
      });
      button.classList.toggle("active");
    });
  });
};

//Make new game
const newGame = () => {
  hintCounter = 0;
  missCounter = 0;
  const mainElement = document.querySelector("main"); //select <main>
  mainElement.innerHTML = ""; //delete <main>
  createSudokuTable();
  answerSudoku = generateSudoku();
  getKeyNumbers();
  levelButtonHandler();
};

// Execute after HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
  createSudokuTable();
  answerSudoku = generateSudoku();
  getKeyNumbers();
  levelButtonHandler();
});

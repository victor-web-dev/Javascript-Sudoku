import { generateSudoku, rowValues, colValues, getAllBlocks } from "./matrix.js";
let answerSudoku;

const matrix = [
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
  console.log(errorFlag);
};

// handle Tab button
const tabHandler = (event) => {
  const { keyCode, target } = event;
  const {
    parentElement: { nextSibling, parentElement },
  } = target;
  if (keyCode == 9 && nextSibling) {
    return nextSibling.firstChild.focus();
  } else if (!nextSibling && parentElement.nextSibling) {
    return parentElement.nextSibling.firstChild.firstChild.focus();
  }
};

//Input
const handleChangeInputValue = (event) => {
  const { target, keyCode } = event;
  if (keyCode == 8 || keyCode == 9) return; //backspace and tab
  const row = target.id.charAt(0);  //get the position
  const col = target.id.charAt(1);  //get the position
  matrix[row][col] = parseInt(target.value);
  console.log(matrix);
  return matrix;
};

//Solver
const solveSudoku = (event) => {
  const arr = answerSudoku;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      const input = document.getElementById(`${i}${j}`);
      input.value = arr[i][j];
    }
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
  tHeaderBtn.addEventListener("click", solveSudoku);

  tHeader.append(tHeaderBtn);
  tHeadRow.append(tHeader);
  tHead.append(tHeadRow);


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
        const allBlocks = getAllBlocks(matrix);
        const blockIndex = getBlockIndex(i + 1, j + 1);
        const blockData = allBlocks[blockIndex + 1]; // blockIndex は0から始まるので、インデックス調整のために+1する
        const blockCheckingArrays = blockData.slice(); 
        const rowCheckingArray = rowValues(matrix, i);
        const colCheckingArray = colValues(matrix, i);
        console.log(colCheckingArray)
        checkDuplicate(event, `${i}${j}`, rowCheckingArray, colCheckingArray, blockCheckingArrays);
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
};
// Method to get block index
const getBlockIndex = (i, j) => {
  return Math.floor((i - 1) / 3) * 3 + Math.floor((j - 1) / 3);
};
let selectNum = null;
let errorFlag = "clear";
let duplicateFlag = false;

// Method to check duplicated
const checkDuplicate = (event, id, rowCheckingArray, colCheckingArray, blockCheckingArray) => {
  let inputElement = document.getElementById(id);
  const { keyCode, target } = event;
  inputElement.classList.remove("duplicate"); // Reset style
  selectNum = target.value.trim();
  console.log(selectNum);
  let rowDuplicate = checkArray(rowCheckingArray, selectNum);
  let colDuplicate = checkArray(colCheckingArray, selectNum);
  let blockDuplicate = checkArray(blockCheckingArray, selectNum);
  if (rowDuplicate|| colDuplicate || blockDuplicate) { // If duplicated
    event.preventDefault();
    inputElement.classList.add("duplicate"); // Apply duplicate style
    displayWarning(); // Display warning message
  } else { // No duplicates
    console.log(`Number: ${selectNum} Place: ${id}`); //show Position
    console.log(`Row Array: ${rowCheckingArray}`); //show row Array
    console.log(`Block Array: ${blockCheckingArray}`); //show Block Array
  }
  console.log(rowCheckingArray);
  console.log(blockCheckingArray);
};

const checkArray = (array, checkNum) => {
  console.log(array)
  let strCheckNum = checkNum.toString().trim(); // Convert checkNum to string and trim whitespace
  let strArray = array.map(num => num.toString()); // Convert Array to string
  return strArray.includes(strCheckNum);  //include or not
};


// Function to display warning message
const displayWarning = () => {
  const warningElement = document.querySelector(".warning");
  warningElement.style.display = "block";
  setTimeout(() => {
    warningElement.style.display = "none";
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => { // Execute after HTML is loaded
  createSudokuTable();
  answerSudoku = generateSudoku();
  console.log(answerSudoku);
});
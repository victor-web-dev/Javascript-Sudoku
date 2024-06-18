const createElement = (tag) => document.createElement(tag);

// validate keyboard numbers
const validNumber = (event) => {
  event.preventDefault();
  const { keyCode, key, target } = event;
  if (keyCode >= 48 && keyCode <= 57) return (target.value = key); // numbers 0 - 9
  if (keyCode == 8) return (target.value = ""); // backspace
};

// handle Tab button
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

// //method to get block index
// const getBlockIndex = (i, j) => {
//   return Math.floor((i - 1) / 3) * 3 + Math.floor((j - 1) / 3);
// };

// let selectNum = null;
// let errorFlag = "clear";
// const checkDuplicate = (id, rowCheckingArray, blockcheckingArray) => {
//   const inputElement = document.getElementById(id);
//   inputElement.addEventListener("input", (event) => {
//     let inputValue = event.target.value; //what filled in input

//     if (
//       event.inputType === "deleteContentBackward" ||
//       inputValue.length === 0
//     ) {
//       //if they press delete key
//       errorFlag = "clear";
//       return;
//     }

//     if (inputValue.length > 1) {
//       //if they put more than 2 digits
//       errorFlag = "oneNumber";
//     } else if (/^[1-9]$/.test(inputValue)) {
//       //if it is "1"-"9"  correct
//       errorFlag = "clear";
//     } else {
//       //if they put non-digit char
//       errorFlag = "onlyNumber";
//     }

//     switch (errorFlag) {
//       case "clear": //if it is "1"-"9"  correct
//         inputElement.parentElement.classList.remove("duplicate"); //reset
//         if (selectNum == null) {
//           //first input
//           selectNum = inputValue;
//           rowCheckingArray.push(inputValue);
//           blockcheckingArray.push(inputValue);
//         } else {
//           //after 2nd
//           selectNum = inputValue;
//           let duplicateFlag = false;

//           for (let number of rowCheckingArray) {
//             //check if it is duplicated
//             if (inputValue == number) {
//               duplicateFlag = true;
//               break;
//             }
//           }

//           for (let number of blockcheckingArray) {
//             if (inputValue == number) {
//               duplicateFlag = true;
//               break;
//             }
//           }

//           if (duplicateFlag) {
//             //if digit is duplicated
//             inputElement.parentElement.classList.add("duplicate"); //give a class
//             document.querySelector(".warning").style.display = "block"; //show warning
//             setTimeout(() => {
//               //show 1s then hide
//               document.querySelector(".warning").style.display = "none";
//             }, 1000);
//           } else {
//             //if it is a first digit
//             rowCheckingArray.push(inputValue);
//             blockcheckingArray.push(inputValue);
//             console.log(`Number: ${selectNum} Place: ${id}`);
//             console.log(`Row Array: ${rowCheckingArray}`);
//             console.log(`Block Array: ${blockcheckingArray}`);
//           }
//         }
//         break;

//       case "oneNumber": //if they put more than 2 digits
//         alert("Only One Number");
//         event.preventDefault();
//         break;

//       case "onlyNumber": //if they put non-digit char
//         alert("Only Number");
//         event.preventDefault();
//         break;
//     }
//   });
// };

document.addEventListener("DOMContentLoaded", () => {
  //DOMContentLoaded is to execute after loading HTML
  createSudokuTable();
  // let blockcheckingArrays = Array.from({ length: 9 }, () => []); //Array.from: create a new Array
  // for (let i = 1; i <= 9; i++) {
  //   //row
  //   let rowCheckingArray = [];
  //   for (let j = 1; j <= 9; j++) {
  //     let blockIndex = getBlockIndex(i, j);
  //     checkDuplicate(
  //       `${i}${j}`,
  //       rowCheckingArray,
  //       blockcheckingArrays[blockIndex]
  //     );
  //   }
  // }
});

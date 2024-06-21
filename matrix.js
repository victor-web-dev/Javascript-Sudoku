// creating the matrix
let arr = [];
for (let i = 0; i < 9; i++) {
  let array = [];
  for (let j = 0; j < 9; j++) {
    array.push(Math.round(Math.random() * 10));
  }
  arr.push(array);
}

console.table(arr);

// get the diagonal from a matrix
const diagonal = (array) => {
  let diagonal = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === j) {
        diagonal.push(array[i][j]);
      }
    }
  }
  console.log("diagonal: " + diagonal);
};

// get the anti diagonal of the matrix
const antiDiagonal = (array) => {
  let antiDiagonal = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = array.length - i - 1; j > -1; j--) {
      antiDiagonal.push(array[i][j]);
      break;
    }
  }
  console.log("anti-diagonal: " + antiDiagonal);
};

//get all values of a row
const rowValues = (array, indexPos = 0) => {
  if (indexPos >= array.length) return -1;
  let row = [];
  for (let i = indexPos; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      row.push(array[i][j]);
    }
    break;
  }
  // console.log("Row: " + row);
  return row;
};

// get all values of a column
const colValues = (array, colPos = 0) => {
  if (colPos >= array.length) return -1;
  let col = [];
  for (let i = 0; i < array.length; i++) {
    col.push(array[i][colPos]);
  }
  console.log("Col: " + col);
  return col;
};

// get all 3x3 blocks starting positions
const getBlocksPositions = (array) => {
  const blocksPositions = [];
  for (let i = 0; i < array.length; i++) {
    let tempArr = [];
    for (let j = 0; j < array.length; j++) {
      if (i % 3 === 0 && j % 3 === 0) tempArr.push([i, j]);
    }
    if (tempArr.length > 1) blocksPositions.push(tempArr);
  }

  //   console.log("block: " + block);
  // console.log(blocksPositions);
  //   console.log(blocksPositions[0][1]);
  return blocksPositions;
};

// get a 3x3 block value;
//propably adapt to get the values from the specific blocks
const block = (array, row = 0, col = 0) => {
  const block = [];
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      block.push(array[i][j]);
    }
  }
  console.log(block);
  return block;
};

// gets all 3x3 blocks data;
const getAllBlocks = (array) => {
  let count = 1;
  const obj = {};
  let positions = getBlocksPositions(array);

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions.length; j++) {
      obj[count] = positions[i][j];
      count++;
    }
  }

  for (let i = 1; i <= 9; i++) {
    obj[i] = block(array, obj[i][0], obj[i][1]);
  }
  console.log(obj);
  //   return obj;
};

// diagonal(arr);
// antiDiagonal(arr);
// rowValues(arr, 4);
// colValues(arr, 8);
// getBlocksPositions(arr);

block(arr, 0, 1);

// getAllBlocks(arr);

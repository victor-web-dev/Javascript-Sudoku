// const getBlockIndex = (i, j) => {
//   return Math.floor((i - 1) / 3) * 3 + Math.floor((j - 1) / 3);
// };

const isValid = (board, row, col, num) => {
  // Check if 'num' is not in current row, current column and current 3x3 sub-box
  for (let x = 0; x < 9; x++) {
    if (
      board[row][x] == num || //check duplicated in row
      board[x][col] == num || //check duplicated in column
      board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
        3 * Math.floor(col / 3) + (x % 3)
      ] == num
    ) {
      //check duplicated in block
      return false;
    }
  }
  return true;
};

const fillBoard = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        //if it is filled 0
        // Shuffle numbers 1 to 9
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        nums = shuffleArray(nums);
        for (let num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateSudoku = () => {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
};

// // creating the matrix
// let arr = [];
// for (let i = 1; i <= 9; i++) {
//   let array = [];
//   for (let j = 1; j <= 9; j++) {
//     array.push(Math.round(Math.random() * 10));
//   }
//   arr.push(array);
// }

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
  return "diagonal: " + diagonal;
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
  return "anti-diagonal: " + antiDiagonal;
};

//get all values of a row
export const rowValues = (array, indexPos = 0) => {
  if (indexPos >= array.length) return -1;
  let row = [];
  for (let i = indexPos; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      row.push(array[i][j]);
    }
    break;
  }
  return row;
};

// get all values of a column
export const colValues = (array, colPos = 0) => {
  if (colPos >= array.length) return -1;
  let col = [];
  for (let i = 0; i < array.length; i++) {
    col.push(array[i][colPos]);
  }
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
  return block;
};

// gets all 3x3 blocks data;
export const getAllBlocks = (array) => {
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
  return obj;
};

let utils = require("../utils");

function parseInput(input) {
  let bingo = {
    drawPile: [],
    boards: [],
  };

  bingo.drawPile = input.shift().split(",");
  bingo.boards = chunkArray(
    input.map((line) =>
      line.split(/\s+/).map((number) => ({ number, marked: false }))
    ),
    5
  );
  return bingo;
}

function chunkArray(array, chunkSize) {
  let chunked = [];
  let chunk = null;
  for (let i = 0; i < array.length; i++) {
    if (i % chunkSize === 0) {
      if (chunk) {
        chunked.push(chunk);
      }
      chunk = [];
    }
    chunk.push(array[i]);
  }
  if (chunk.length) {
    chunked.push(chunk);
  }
  return chunked;
}

function markBoards(number, boards) {
  for (let board of boards) {
    for (let row of board) {
      for (let field of row) {
        if (field.number === number) {
          field.marked = true;
        }
      }
    }
  }
}

function checkWinner(boards) {
  for (let i = 0; i < boards.length; i++) {
    let board = boards[i];
    if (checkHorizontal(board) || checkVertical(board)) {
      return i;
    }
  }
  return null;
}

function checkHorizontal(board) {
  for (let row of board) {
    if (row.every((field) => field.marked)) {
      return true;
    }
  }
}

function checkVertical(board) {
  for (let x = 0; x < 5; x++) {
    let allMarked = true;
    for (let y = 0; y < 5; y++) {
      if (board[y][x].marked === false) {
        allMarked = false;
        break;
      }
    }
    if (allMarked) {
      return true;
    }
  }
}

function playGame(bingo) {
  let winStates = [];
  for (let number of bingo.drawPile) {
    markBoards(number, bingo.boards);

    let i = checkWinner(bingo.boards);
    while (i !== null) {
      winStates.push({
        board: bingo.boards.splice(i, 1)[0],
        number,
      });
      i = checkWinner(bingo.boards);
    }
  }
  return winStates;
}

function result(winState) {
  let sum = 0;
  for (let row of winState.board) {
    for (let field of row) {
      if (!field.marked) {
        sum += Number(field.number);
      }
    }
  }
  return sum * winState.number;
}

async function main() {
  let bingo = parseInput(await utils.loadInput());
  let winStates = playGame(bingo);

  console.log(result(winStates[0]));
  console.log(result(winStates[winStates.length - 1]));
}

main();

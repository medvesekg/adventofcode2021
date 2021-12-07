let utils = require("../utils");

async function parseInput() {
  let input = await utils.loadInput();
  return input[0].split(",").map(Number);
}

function tick(state) {
  let newState = [];
  let newFish = 0;

  for (let fish of state) {
    if (fish === 0) {
      newState.push(6);
      newFish++;
    } else {
      newState.push(fish - 1);
    }
  }
  for (let i = 0; i < newFish; i++) {
    newState.push(8);
  }
  return newState;
}

async function main() {
  let state = await parseInput();
  for (let i = 0; i < 256; i++) {
    console.log(i);
    state = tick(state);
  }
  console.log(state.length);
}

main();

let utils = require("../utils");

async function parseInput() {
  let input = await utils.loadInput();
  let nums = input[0].split(",").map(Number);
  let state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let num of nums) {
    state[num]++;
  }
  return state;
}

function tick(state) {
  state = state.slice();
  let newFish = state.shift();
  state.push(newFish);
  state[6] += newFish;
  return state;
}

async function main() {
  let state = await parseInput();

  for (let i = 0; i < 256; i++) {
    state = tick(state);
  }

  console.log(
    state.reduce((sum, num) => {
      return (sum += num);
    }, 0)
  );
}

main();

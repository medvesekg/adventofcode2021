let utils = require("../utils");

async function parseInput() {
  let input = await utils.loadInput();
  let state = input[0].split(",").map(Number);
  state.sort((a, b) => a - b);
  return state;
}

function medianValues(sortedNums) {
  let middle = sortedNums.length / 2;
  if (middle % 1 === 0) {
    return [sortedNums[middle]];
  } else {
    return [sortedNums[(Math.floor(middle), Math.ceil(middle))]];
    //return (sortedNums[Math.floor(middle)] + sortedNums[Math.ceil(middle)]) / 2;
  }
}

function meanValue(nums) {
  return Math.floor(nums.reduce((sum, num) => (sum += num), 0) / nums.length);
}

function align(state, value) {
  return state.reduce((fuel, num) => {
    return (fuel += Math.abs(num - value));
  }, 0);
}

function fuelCost(num) {
  if (num === 0) {
    return 0;
  }
  return num + fuelCost(num - 1);
}

function align2(state, value) {
  return state.reduce((fuel, num) => {
    return (fuel += fuelCost(Math.abs(num - value)));
  }, 0);
}

async function main() {
  let state = await parseInput();
  let middleValues = medianValues(state);
  let fuelValues = middleValues.map((value) => align(state, value));
  console.log(Math.min(fuelValues));

  let mean = meanValue(state);
  console.log(align2(state, mean));
}

main();

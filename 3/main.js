let utils = require("../utils");

function countBits(input) {
  let columns = [];
  for (let line of input) {
    for (let i in line) {
      let char = line[i];
      if (!columns[i]) {
        columns[i] = {};
      }
      let counts = columns[i];
      if (!counts[char]) {
        counts[char] = 0;
      }
      counts[char]++;
    }
  }
  return columns;
}

function mostCommonBit(bitCount) {
  let count0 = bitCount["0"];
  let count1 = bitCount["1"];

  return count0 > count1 ? 0 : 1;
}

function leastCommonBit(bitCount) {
  let count0 = bitCount["0"];
  let count1 = bitCount["1"];

  return count0 < count1 ? 0 : 1;
}

function epsilonRate(input) {
  let bitCounts = countBits(input);
  let result = "";
  for (let bitCount of bitCounts) {
    result += leastCommonBit(bitCount);
  }
  return parseInt(result, 2);
}

function gammaRate(input) {
  let bitCounts = countBits(input);
  let result = "";
  for (let bitCount of bitCounts) {
    result += mostCommonBit(bitCount);
  }
  return parseInt(result, 2);
}

function result(input) {
  return gammaRate(input) * epsilonRate(input);
}

async function main() {
  console.log(result(await utils.loadInput()));
}

main();

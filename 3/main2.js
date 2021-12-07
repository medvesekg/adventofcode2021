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

  return count1 >= count0 ? "1" : "0";
}

function leastCommonBit(bitCount) {
  let count0 = bitCount["0"];
  let count1 = bitCount["1"];

  return count0 <= count1 ? "0" : "1";
}

function oxygenGeneratorRating(inputArg) {
  let input = inputArg.slice();
  for (let i in countBits(input)) {
    let bitCount = countBits(input)[i];
    let bit = mostCommonBit(bitCount);
    input = input.filter((line) => line[i] === bit);

    if (input.length === 1) {
      return parseInt(input[0], 2);
    }
  }
}

function CO2ScrubberRating(inputArg) {
  let input = inputArg.slice();
  for (let i in countBits(input)) {
    let bitCount = countBits(input)[i];
    let bit = leastCommonBit(bitCount);
    input = input.filter((line) => line[i] === bit);

    if (input.length === 1) {
      return parseInt(input[0], 2);
    }
  }
}

function result(input) {
  return oxygenGeneratorRating(input) * CO2ScrubberRating(input);
}

async function main() {
  console.log(result(await utils.loadInput()));
}

main();

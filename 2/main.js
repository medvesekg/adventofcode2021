const fs = require("fs");

async function loadInput() {
  return new Promise((resolve, reject) => {
    fs.readFile("input", "utf-8", function (err, data) {
      if (err) {
        reject(err);
      }
      return resolve(
        data
          .split("\n")
          .map((v) => v.trim())
          .filter((v) => v)
      );
    });
  });
}

function result(submarine) {
  return submarine.horizontalPosition * submarine.depth;
}

async function main() {
  let input = await loadInput();

  let submarine = {
    horizontalPosition: 0,
    depth: 0,
  };

  let instructions = {
    forward: {
      prop: "horizontalPosition",
      value: (value) => value,
    },
    down: {
      prop: "depth",
      value: (value) => value,
    },
    up: {
      prop: "depth",
      value: (value) => -value,
    },
  };

  let commands = input.map((line) => {
    let [action, value] = line.split(" ");
    return { action, value: Number(value) };
  });

  for (let command of commands) {
    let instruction = instructions[command.action];
    submarine[instruction.prop] += instruction.value(command.value);
  }

  console.log(result(submarine));
}

main();

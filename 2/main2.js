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
    aim: 0,
  };

  let instructions = {
    forward: (value, submarine) => {
      submarine.horizontalPosition += value;
      submarine.depth += submarine.aim * value;
    },
    down: (value, submarine) => {
      submarine.aim += value;
    },
    up: (value, submarine) => {
      submarine.aim -= value;
    },
  };

  let commands = input.map((line) => {
    let [action, value] = line.split(" ");
    return { action, value: Number(value) };
  });

  for (let command of commands) {
    let instruction = instructions[command.action];
    instruction(command.value, submarine);
  }
  console.log(result(submarine));
}

main();

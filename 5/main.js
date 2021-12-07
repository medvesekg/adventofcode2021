let utils = require("../utils");

function parseInput(input) {
  return input.map((line) => {
    let [from, to] = line
      .split("->")
      .map((part) => part.trim())
      .filter((part) => part)
      .map((part) => part.split(",").map(Number));

    return {
      start: {
        x: from[0],
        y: from[1],
      },
      end: {
        x: to[0],
        y: to[1],
      },
    };
  });
}

function getPointsBetween(start, end) {
  let points = [];
  let horizontal = start.x - end.x;
  let vertical = start.y - end.y;
  let length = Math.abs(horizontal || vertical);

  for (let i = 0; i <= length; i++) {
    let x = start.x;
    let y = start.y;
    if (horizontal) {
      x += horizontal < 0 ? i : -i;
    }
    if (vertical) {
      y += vertical < 0 ? i : -i;
    }
    points.push({
      x,
      y,
    });
  }
  return points;
}

function result(ranges) {
  let points = {};
  for (let range of ranges) {
    for (let point of getPointsBetween(range.start, range.end)) {
      let key = `x${point.x}y${point.y}`;
      if (!points[key]) {
        points[key] = {
          x: point.x,
          y: point.y,
          count: 0,
        };
      }
      points[key].count++;
    }
  }
  return Object.values(points).filter((point) => point.count > 1).length;
}

async function main() {
  let ranges = parseInput(await utils.loadInput());
  let onlyHorizontalAndVertical = ranges.filter((range) => {
    return range.start.x === range.end.x || range.start.y === range.end.y;
  });

  console.log(result(onlyHorizontalAndVertical));
  console.log(result(ranges));
}

main();

async function loadInput(path = "input") {
  return new Promise((resolve, reject) => {
    let fs = require("fs");
    fs.readFile(path, "utf-8", function (err, data) {
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

module.exports = {
  loadInput,
};

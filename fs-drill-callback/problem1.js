// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously
// */
const fs = require("fs");

function createJsonFiles(cb, num = 4) {
  fs.mkdir("./Json", () => {
    let count = 0;
    for (let index = 1; index <= num; index++) {
      fs.writeFile(
        `./Json/file${index}.json`,
        JSON.stringify(`i m File${1}`),
        (err) => {
          if (err) {
            console.error(err.message);
          }
          console.log(`file ${index} created`);
        }
      );
      count++;
    }
    if (count === num) {
      cb(num);
    }
  });
}

function removeJsonFiles(num, cb) {
  let count = 0;
  for (let index = 1; index <= num; index++) {
    fs.rm(`./Json/file${index}.json`, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log(`file ${index}removed`);
      count++;
      if (count == num) {
        cb();
      }
    });
  }
}

function removeDirectory(cb) {
  fs.rmdir("./Json", (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    cb();
  });
}

// sample();
module.exports = { createJsonFiles, removeDirectory, removeJsonFiles };

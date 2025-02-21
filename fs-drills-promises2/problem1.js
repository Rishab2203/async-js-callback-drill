// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously
// */

const fs = require("fs");

function createDirectory() {
  return new Promise((resolve, reject) => {
    fs.mkdir("./Json", { recursive: true }, (err) => {
      if (err) {
        console.error("Error in file creation", err);
        reject(err);
      }
      console.log("Directory created");
      resolve();
    });
  });
}

function createJsonFiles(n) {
  return new Promise((resolve, reject) => {
    let count = 0;
    for (let index = 1; index <= n; index++) {
      fs.writeFile(`./file${index}.json`, ` I m file${index}`, (err) => {
        if (err) {
          console.error("Error in file creation", err);
          reject(err);
          return;
        }
        count++;
        if (count === index) {
          console.log("all files created");
          resolve(n);
        }
      });
    }
  });
}

function deleteJsonFiles(n) {
  return new Promise((resolve, reject) => {
    let count = 0;
    for (let index = 1; index <= n; index++) {
      fs.unlink(`./file${index}.json`, (err) => {
        if (err) {
          console.error("Error in deleting file", err);
          reject(err);
        }
        count++;
        if (count == index) {
          console.log("all files deleted");
          resolve();
        }
      });
    }
  });
}

function deleteDirectory() {
  return new Promise((resolve, reject) => {
    fs.rmdir("./Json", (err) => {
      if (err) {
        console.log(err);
        reject();
      }
      console.log("directory deleted");
      resolve();
    });
  });
}

createDirectory()
  .then(() => createJsonFiles(5))
  .then((num) => deleteJsonFiles(num))
  .then(() => deleteDirectory())
  .catch((err) => console.log(err));

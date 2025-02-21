//Firstly, for promises,  learn how to consume readymade promises. So do the same callback drill using promises from fs library.
const fs = require("fs/promises");

// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously
// */

function createDirectory() {
  return fs
    .mkdir("./Json", { recursive: true })
    .then(() => {
      console.log("directory created");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createJsonFiles(n) {
  let createFilePromises = [];
  for (let index = 1; index <= n; index++) {
    let filePromise = fs
      .writeFile(`./Json/file${index}.json`, `i m file${index}`)
      .catch((err) => {
        console.log(console.log(err));
      });
    createFilePromises.push(filePromise);
  }

  return Promise.all(createFilePromises).then(() => {
    console.log("files created");
    return n;
  });
}

function deleteJsonFiles(n) {
  let deleteFilesPromises = [];
  for (let index = 1; index <= n; index++) {
    let filePromise = fs.rm(`./Json/file${index}.txt`).catch((err) => {
      console.log(err);
    });
    deleteFilesPromises.push(filePromise);
  }
  return Promise.all(deleteFilesPromises)
    .then(() => {
      console.log("all files deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

createDirectory()
  .then(() => createJsonFiles(5))
  .then((num) => deleteJsonFiles(num))
  .catch((err) => {
    console.log(err);
  });

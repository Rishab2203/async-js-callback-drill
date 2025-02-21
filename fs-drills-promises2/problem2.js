/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require("fs");

function readfiles(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log("Error occured while reading file", err);
        reject();
      }
      resolve(data.toString());
    });
  });
}

function writeFiles(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        console.log(`Error occured in creating ${path} file.`, err);
        reject();
      }
      resolve();
    });
  });
}

function appendData(path, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) {
        console.log(`Error occured in creating ${path} file.`, err);
        reject();
      }
      resolve(data);
    });
  });
}

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(`Error occured in creating ${path} file.`, err);
        reject();
      }
      resolve();
    });
  });
}

function upperCaseFile(path, data) {
  return new Promise((resolve, reject) => {
    let processedData = data.toUpperCase();
    writeFiles(path, processedData)
      .then(() => writeFiles("./filenames.txt", `${path}\n`))
      .then(() => resolve(data))
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}

function lowerCaseFile(path, data) {
  return new Promise((resolve, reject) => {
    let processedData = data.toLowerCase().split(". ").join("\n");
    writeFiles(path, processedData)
      .then(() => appendData("./filenames.txt", `${path}\n`))
      .then(() => resolve(data))
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}

function combineAndsort() {
  return new Promise((resolve, reject) => {
    readfiles("./filenames.txt")
      .then((data) => {
        let filenames = data.split("\n").filter((file) => file != "");
        let fileReadPromises = filenames.map((file) =>
          readfiles(file).catch((err) => {
            console.log(`Error in reading ${file}`, err);
            reject();
          })
        );
        return Promise.all(fileReadPromises);
      })
      .then((fileContents) => {
        const combinedContent = fileContents.join("\n");

        let sortedContent = combinedContent
          .split("\n")
          .filter((line) => line.trim() !== "")
          .sort()
          .join("\n");
        return writeFiles("./sort.txt", sortedContent);
      })
      .then(() => appendData("./filenames.txt", "./sort.txt"))
      .then(() => resolve());
  });
}

function deleteFilesInFileName() {
  return new Promise((resolve, reject) => {
    readfiles("./filenames.txt")
      .then((data) => {
        let filenames = data.split("\n").filter((file) => file != "");
        let fileDeletePromises = filenames.map((file) =>
          deleteFile(file).catch((err) => {
            console.log(`Error in reading ${file}`, err);
            reject();
          })
        );
        return Promise.all(fileDeletePromises);
      })
      .then(() => {
        console.log("all Files Deleted");
        resolve();
      });
  });
}

readfiles("./lipsum.txt")
  .then((data) => upperCaseFile("./upperCase.txt", data))
  .then((data) => lowerCaseFile("./lowerCase.txt", data))
  .then(() => combineAndsort())
  .then(() => deleteFilesInFileName())
  .catch((err) => console.log(err));

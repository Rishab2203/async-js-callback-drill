/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require("fs/promises");

function readLipsum() {
  return fs
    .readFile("./lipsum.txt")
    .then((data) => {
      return data.toString();
    })
    .catch((err) => console.log("Error occured file reading file", err));
}

function upperCaseText(data) {
  let processedData = data.toUpperCase();

  return fs
    .writeFile("./upperCase.txt", processedData)
    .then(() => {
      console.log("upper Case File Created");
      return fs.writeFile("./filenames.txt", "upperCase.txt\n");
    })
    .then(() => {
      console.log("file name appended");
      return data;
    });
}

function lowerCaseAndSplitText(data) {
  let processedData = data
    .toLowerCase()
    .split(". ")
    .map((line) => line.trim())
    .join(".\n");

  return fs
    .writeFile("./lowerCase.txt", processedData)
    .then(() => {
      console.log("lowerCase file created");
      return fs.appendFile("./filenames.txt", "lowerCase.txt\n");
    })
    .then(() => {
      console.log("file name added");
      return data;
    })
    .catch(() => {
      console.log(err);
    });
}

function readFilesAndmerge() {
  return fs
    .readFile("./filenames.txt", "utf-8")
    .then((data) => {
      let filenames = data.split("\n").filter((file) => file != "");

      const fileReadPromises = filenames.map((file) =>
        fs.readFile(file, "utf-8").catch((err) => {
          console.log(`Error reading file ${file}`, err);
        })
      );

      return Promise.all(fileReadPromises);
    })
    .then((fileContents) =>
      fs.writeFile("./sort.txt", fileContents.sort().join(""))
    )
    .then(() => fs.appendFile("./filenames.txt", "sort.txt\n"))
    .catch((err) => {
      console.log(err);
    });
}

function deleteAllFiles() {
  return fs.readFile("./filenames.txt", "utf-8").then((data) => {
    let filenames = data.split("\n").filter((file) => file != "");

    let deleteFilePromises = filenames.map((file) =>
      fs
        .rm(file)
        .catch((err) => console.log(`error deleting file ${file}`, err))
    );
    return Promise.all(deleteFilePromises)
      .then(() => console.log("all files deleted"))
      .catch((err) => console.log("Error deleting files", err));
  });
}

readLipsum()
  .then((data) => upperCaseText(data))
  .then((data) => lowerCaseAndSplitText(data))
  .then(() => readFilesAndmerge())
  .then(() => deleteAllFiles())
  .catch((err) => console.log(err));

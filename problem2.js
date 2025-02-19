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

// 1. Read the given file lipsum.txt

function readFiles(cb) {
  fs.readFile("./lipsum.txt", (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    cb(data.toString());
  });
}

function changeToUpper(data, cb) {
  fs.writeFile("./upperCase.txt", data.toUpperCase(), (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("file created");
    fs.writeFile("./filenames.txt", "upperCase.txt\n", (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("file name Added");
    });
  });
  cb(data);
}

function splitAndChangeToLowerCase(data, cb) {
  let sentences = data
    .toString()
    .toLowerCase()
    .split(". ")
    .map((line) => `${line.trim()}. `);
  let processedData = sentences.join("\n");

  fs.writeFile("./lowerCase.txt", processedData, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("file created");
    fs.appendFile("./filenames.txt", "lowerCase.txt\n", (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("file name Added");
      cb();
    });
  });
}

function readFilesAndSort(cb) {
  fs.readFile("./filenames.txt", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    let files = data
      .toString()
      .split("\n")
      .filter((file) => file != "");

    let dataInFiles = [];
    let count = 0;
    files.forEach((file) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          console.log(err.message);
          return;
        }
        let sentences = data.toString().split(". ");
        dataInFiles = [...dataInFiles, ...sentences];
        count += 1;

        if (count == files.length) {
          let processedData = dataInFiles
            .sort()
            .map((line) => `${line.trim()}.`)
            .join("\n");

          fs.writeFile("./sorted.txt", processedData, (err) => {
            if (err) {
              console.log(err.message);
              return;
            }
            fs.appendFile("./filenames.txt", "sorted.txt\n", (err) => {
              if (err) {
                console.log(err.message);
                return;
              }
              console.log("sorted file added");
              cb();
            });
          });
        }
      });
    });
  });
}

function removeFiles() {
  fs.readFile("./filenames.txt", (err, data) => {
    let files = data
      .toString()
      .split("\n")
      .filter((file) => file != "");
    files.forEach((file) => {
      fs.rm(file, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`${file} deleted`);
      });
    });
  });
}

readFiles((data) => {
  console.log("file read completed");
  changeToUpper(data, () => {
    console.log("changed to upper and file created");
    splitAndChangeToLowerCase(data, () => {
      console.log("changed to lower splited and created ");
      readFilesAndSort(() => {
        removeFiles();
      });
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  readFiles,
  changeToUpper,
  splitAndChangeToLowerCase,
  removeFiles,
};

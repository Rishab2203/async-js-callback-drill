const {
  createJsonFiles,
  removeDirectory,
  removeJsonFiles,
} = require("../problem1.js");

createJsonFiles((num) => {
  console.log("directory and Json files created");
  removeJsonFiles(num, () => {
    removeDirectory(() => {
      console.log("Json directory deleted");
    });
  });
});

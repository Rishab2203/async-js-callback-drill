const {
  readFiles,
  changeToUpper,
  splitAndChangeToLowerCase,
  removeFiles,
  readFilesAndSort,
} = require("../problem2.js");

readFiles((data) => {
  console.log("file reading completed");
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

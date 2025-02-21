console.log("program started");

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Program complete");
    resolve();
  }, 3000);
});

console.log(p1);
console.log("Program in progress....");

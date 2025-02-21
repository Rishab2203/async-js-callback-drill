console.log("Program Started");

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Step 1 complete");
  }, 3000);
});

console.log(promise1);
console.log("program in progress");

promise1
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Step 2 complete");
      }, 3000);
    });
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

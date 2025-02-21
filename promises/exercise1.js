console.log("Program Started");

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Program complete");
  }, 3000);
  setTimeout(() => {
    reject("program failure");
  }, 2000);
});

console.log(promise1);
console.log("program in progress");

promise1
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log("rejected with:", err));

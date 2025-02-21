console.log("Program Started");

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ data: "Hello, friend!", error: null });
  }, 5000);
});

console.log(promise1);
console.log("Program in progress");

promise1
  .then((data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("First Promise Chain complete");
      }, 2000);
    });
  })
  .then((res) => console.log(res));

promise1
  .then((data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data);
        resolve("Second Promise Chain complete");
      }, 10000);
    });
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

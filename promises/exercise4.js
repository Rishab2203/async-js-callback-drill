const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
  }, 10000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 5000);
});

Promise.all([promise1, promise2])
  .then((data) => {
    console.log(data.reduce((acc, curr) => acc + curr));
  })
  .catch((err) => console.log(err));

const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('Success!'); this would be fulfilling our promise
    reject('Nope! You shall not pass') // rejecting the promise
  }, 2000)
});

doWorkPromise.then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
})
"use strict";
// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve('Success!'); this would be fulfilling our promise
//     reject('Nope! You shall not pass') // rejecting the promise
//   }, 2000)
// });
// doWorkPromise.then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// })
var add = function (a, b) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(a + b);
        }, 2000);
    });
};
// add(1,2).then((sum) => {
//   console.log(sum);
//   add(sum , 5).then((sum) => {
//     console.log(sum)
//   }).catch((e) => {
//     console.log(e);
//   })
// }).catch((e) => {
//   console.log(e)
// } )
add(1, 1).then(function (sum) {
    console.log(sum);
    return add(sum, 4);
}).then(function (sum2) {
    console.log(sum2);
}).catch(function (e) {
    console.log(e);
});

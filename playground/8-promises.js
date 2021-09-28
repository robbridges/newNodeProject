"use strict";
var doWorkPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        //resolve('Success!');
        reject('Nope! You shall not pass');
    }, 2000);
});
doWorkPromise.then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});

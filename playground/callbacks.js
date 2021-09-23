"use strict";
setTimeout(function () {
    console.log('Two seconds are up');
}, 2000);
var names = ['Rob', 'Mike', 'Steve'];
var shortName = names.filter(function (name) {
    return name.length <= 4;
});
console.log(shortName);
var geocode = function (address, callback) {
    setTimeout(function () {
        var data = {
            latitude: 0,
            longitude: 0,
        };
        callback(data);
    }, 2000);
};
geocode('djjdwlak', function (data) {
    console.log(data);
});
var add = function (num1, num2, callback) {
    setTimeout(function () {
        var result = num1 + num2;
        callback(result);
    }, 2000);
};
add(1, 4, function (sum) {
    console.log(sum);
});

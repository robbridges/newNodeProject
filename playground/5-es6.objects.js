"use strict";
var userName = 'Rob';
var userAge = '33';
var user = {
    userName: userName,
    age: userAge,
    location: 'Yakima'
};
console.log(user);
var product = {
    label: 'Salmon',
    price: 15,
    stock: 201,
    salePrice: undefined
};
// const label = product.label;
// const stock = product.stock;
// const {label:productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);
var transaction = function (type, _a) {
    var label = _a.label, stock = _a.stock;
    console.log(type, label, stock);
};
transaction('order', product);

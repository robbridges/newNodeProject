"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var url = "http://api.weatherstack.com/current?access_key=e61d54f37409906fc4a83d8b8e27ee76&query=yakima&units=f";
var request = http.request(url, function (response) {
    var data = '';
    response.on('data', function (chunk) {
        data = data + chunk.toString();
    });
    response.on('end', function () {
        var body = JSON.parse(data);
        console.log(body);
    });
});
request.end();

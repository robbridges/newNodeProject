"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var publicDir = path.join(__dirname, '../public');
var app = express();
app.use(express.static(publicDir));
app.get('/help', function (req, res) {
    res.send({
        name: 'Rob',
        age: '33'
    });
});
app.get('/about', function (req, res) {
    res.send("<h1>\n  About us\n  </h1>");
});
app.get('/weather', function (req, res) {
    res.send({
        forcast: 'sunny',
        location: 'the bronx'
    });
});
var port = 3000;
app.listen(port, function () {
    console.log("Server has started on " + port);
});

"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var publicDir = path.join(__dirname, '../public');
var app = express();
app.use(express.static(publicDir));


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

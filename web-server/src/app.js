"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var publicDir = path.join(__dirname, '../public');
var app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use(express.static(publicDir));
app.get('', function (req, res) {
    res.render('index', {
        title: 'Weather App',
        name: 'Rob Bridges'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About us'
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        title: 'Come here if you are seeking help',
        message: 'Yeah this is an unfinished page. No help to find here'
    });
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

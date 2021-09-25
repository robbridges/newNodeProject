"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var hbs = require('hbs');
var publicDir = path.join(__dirname, '../public');
var viewPaths = path.join(__dirname, '../templates/views');
var partialPaths = path.join(__dirname, '../templates/partials');
var app = express();
app.set('views', viewPaths);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPaths);
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
app.get('/help/*', function (req, res) {
    res.render('notFound', {
        title: 'Help article not found',
        errorMessage: 'The help article requested could not be found'
    });
});
app.get('*', function (req, res) {
    res.render('notFound', {
        title: 'Page not found',
        errorMessage: 'The page you requested is not found'
    });
});
var port = 3000;
app.listen(port, function () {
    console.log("Server has started on " + port);
});

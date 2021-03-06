"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path = require("path");
var express = require("express");
var weather_js_1 = require("./utils/weather.js");
var location_js_1 = require("./utils/location.js");
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
        title: 'Help',
        message: 'Yeah this is an unfinished page. No help to find here'
    });
});
app.get('/weather', function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    var returnWeatherData = function (location) { return __awaiter(void 0, void 0, void 0, function () {
        var weatherData, locationData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, weather_js_1.getWeatherData)(location)];
                case 1:
                    weatherData = _a.sent();
                    return [4 /*yield*/, (0, location_js_1.getLocationData)(location)];
                case 2:
                    locationData = _a.sent();
                    return [2 /*return*/, res.send({
                            data: weatherData,
                            location: locationData
                        })];
            }
        });
    }); };
    returnWeatherData(req.query.address);
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

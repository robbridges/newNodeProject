"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socketio = require('socket.io');
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = socketio(server);
var port = process.env.PORT || 3000;
var publicPathDir = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicPathDir));
io.on('connection', function (socket) {
    console.log('New websocket connection');
    var welcome = "welcome!";
    socket.emit('message', welcome);
    socket.broadcast.emit('message', 'A new user has joined');
    socket.on('sendMessage', function (message) {
        io.emit('message', message);
    });
    socket.on('sendLocation', function (positionObj, callback) {
        io.emit('message', "https://google.com/maps?q=" + positionObj.latitude + "," + positionObj.longitude);
        callback();
    });
    socket.on('disconnect', function () {
        io.emit('message', 'A user has left');
    });
});
server.listen(port, function () {
    console.log("listening on port " + port);
});

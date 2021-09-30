"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./models/user"));
var task_1 = __importDefault(require("./models/task"));
require('./db/mongoose');
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.post('/users', function (req, res) {
    var user = new user_1.default(req.body);
    user.save().then(function () {
        res.send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});
app.post('/tasks', function (req, res) {
    var task = new task_1.default(req.body);
    task.save().then(function () {
        res.send(task);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});
app.get('/users', function (req, res) {
    user_1.default.find({}).then(function (users) {
        res.send(users);
    }).catch(function (e) {
        res.status(500).send(e);
    });
});
app.get('/users/:id', function (req, res) {
    var _id = req.params.id;
    user_1.default.findById(_id).then(function (user) {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});
app.get('/tasks', function (req, res) {
    task_1.default.find({}).then(function (tasks) {
        res.send(tasks);
    }).catch(function (e) {
        res.status(500).send(e);
    });
});
app.get('/tasks/:id', function (req, res) {
    var _id = req.params.id;
    task_1.default.findById(_id).then(function (task) {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch(function (e) {
        res.status(500).send(e);
    });
});
app.listen(port, function () {
    console.log("Listening on " + port);
});

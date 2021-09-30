"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('../src/db/mongoose');
var task_1 = __importDefault(require("../src/models/task"));
task_1.default.findByIdAndDelete('6152a384de212b59a60471db').then(function (task) {
    console.log(task + " is to be deleted");
    return task_1.default.countDocuments({ completed: false });
}).then(function (result) {
    console.log(result);
}).catch(function (e) {
    console.log(e);
});

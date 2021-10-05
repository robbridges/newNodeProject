"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const task_1 = __importDefault(require("./routers/task"));
require('./db/mongoose');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(user_1.default);
app.use(task_1.default);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../models/task"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/tasks', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // we are going to link specific users to tasks. Users should not be able to do anything if it's not their task.
    const task = new task_1.default(Object.assign(Object.assign({}, req.body), { owner: req.user._id }));
    try {
        yield task.save();
        res.status(201).send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find({});
        res.send(tasks);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.get('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const task = yield task_1.default.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = Object.keys(req.body);
        const task = yield task_1.default.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        task.save();
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (e) {
        res.status(500).send();
    }
}));
exports.default = router;

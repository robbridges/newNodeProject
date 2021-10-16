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
// GET /tasks?limit=10
// GeT /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // /tasks?completed=true will return only tasks for the user that are marked as completed, where as /tasks=false will return all non complete tasks for the user. Though I really do not
    // see this api and a user ever generating 1000 tasks it's a good skill to have, not supply the query string will return all tasks without the filtration.
    const match = {};
    const sort = {};
    const limit = req.query.limit;
    const skip = req.query.skip;
    const sortBy = req.query.sortBy;
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    if (req.query.sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        yield req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort,
            }
        });
        res.send(req.user.tasks);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.get('/tasks/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const task = yield task_1.default.findOne({ _id, owner: req.user._id });
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
router.patch('/tasks/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = Object.keys(req.body);
        const task = yield task_1.default.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.body[update]);
        task.save();
        res.send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/tasks/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we actually are changing up how users can view tasks. Only tasks created by that user can patched, deleted. exct, this changes our mongoose function a bit. Nothing too big.
        const task = yield task_1.default.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
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

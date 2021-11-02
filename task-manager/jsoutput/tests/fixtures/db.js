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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../src/models/user"));
const task_1 = __importDefault(require("../../src/models/task"));
const userOneId = new mongoose_1.default.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Fake user',
    email: 'Imnotreal@example.com',
    password: '123fourfivesix',
    tokens: [{
            token: jsonwebtoken_1.default.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }]
};
const userTwoId = new mongoose_1.default.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Fake user2',
    email: 'stillnotreal@example.com',
    password: '123fourfivesix',
    tokens: [{
            token: jsonwebtoken_1.default.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }]
};
const taskOne = {
    _id: new mongoose_1.default.Types.ObjectId(),
    description: 'Fake task',
    completed: false,
    owner: userOne._id
};
const taskTwo = {
    _id: new mongoose_1.default.Types.ObjectId(),
    description: 'Fake task 2',
    completed: true,
    owner: userOne._id
};
const taskThree = {
    _id: new mongoose_1.default.Types.ObjectId(),
    description: 'Fake task 3',
    completed: true,
    owner: userTwo._id
};
const setUpDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany();
    yield task_1.default.deleteMany();
    yield new user_1.default(userOne).save();
    yield new user_1.default(userTwo).save();
    yield new task_1.default(taskOne).save();
    yield new task_1.default(taskTwo).save();
    yield new task_1.default(taskThree).save();
});
module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase,
};

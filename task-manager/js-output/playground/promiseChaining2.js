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
require('../src/db/mongoose');
const task_1 = __importDefault(require("../src/models/task"));
//the below works, we can chain multiple promises this way, but the asyc await syntax left in this file is much more clean and easy to work with. leaving for visibility
// Task.findByIdAndDelete('6152a384de212b59a60471db').then((task) => {
//   console.log(`${task} is to be deleted`);
//   return Task.countDocuments({ completed: false});
// }).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });
const deleteTaskAndCountRecords = (id, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedTask = yield task_1.default.findByIdAndDelete(id);
    const count = yield task_1.default.countDocuments({ completed });
    return count;
});
deleteTaskAndCountRecords('6152a36303ee57bbbd495e2a', false).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

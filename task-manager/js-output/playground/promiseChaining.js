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
const user_1 = __importDefault(require("../src/models/user"));
/* Promise chaining goodness, we are first finding the user by id and updating their age to one then searching for any other user in the records that have this age. This would be super useful
for unique email validation */
//6152a10a1cb015f3194e921a
// User.findByIdAndUpdate('6153c82234cd603ba0c0b74e', { age: 1}).then((user) => {
//   console.log(user);
//   return User.countDocuments({age: 1})
// }).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });
// async await would be better and easier to understand here
const updateUserAndReturnCount = (id, age) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByIdAndUpdate(id, { age });
    const count = yield user_1.default.countDocuments({ age });
    return count;
});
updateUserAndReturnCount('6152a10a1cb015f3194e921a', 23).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});

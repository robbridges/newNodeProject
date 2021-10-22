"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = __importDefault(require("../src/math"));
test('calculate tip', () => {
    const total = (0, math_1.default)(10, .3);
    if (total !== 13) {
        throw new Error(`Total tip should be 13. We got ${total}`);
    }
    return total;
});

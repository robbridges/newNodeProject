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
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../src/math");
test('calculate tip', () => {
    const total = math_1.Math.calculateTip(10, .3);
    expect(total).toBe(13);
});
test('calculates tip with default value', () => {
    const total = math_1.Math.calculateTip(10);
    expect(total).toBe(12.50);
});
test('converterts Fahrenheit to Celsius', () => {
    const fahrenheit = math_1.Math.fahrenheitToCelsius(32);
    expect(fahrenheit).toBe(0);
});
test('converts celsius to Fahrenheit', () => {
    const celsius = math_1.Math.celsiusToFahrenheit(0);
    expect(celsius).toBe(32);
});
test('Should add two numbers', (done) => {
    math_1.Math.add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});
test('Should add two numbers async/await', () => __awaiter(void 0, void 0, void 0, function* () {
    const sum = yield math_1.Math.add(10, 22);
    expect(sum).toBe(32);
}));

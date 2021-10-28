"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Math = void 0;
class Math {
}
exports.Math = Math;
Math.calculateTip = (total, percent = .25) => {
    const tip = total * percent;
    return total + tip;
};
Math.fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8;
};
Math.celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
};
Math.add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

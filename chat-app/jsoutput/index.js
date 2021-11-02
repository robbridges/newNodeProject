"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var publicPathDir = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicPathDir));
app.listen(port, function () {
    console.log("listening on port " + port);
});

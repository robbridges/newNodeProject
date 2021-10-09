"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// this interface seems much more simple than the user model. We'll probably add more to it, but for now it works. NO need to overcomplicate with unused fuctionality yet
const taskSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)('task', taskSchema);

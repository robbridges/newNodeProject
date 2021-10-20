"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('task', taskSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate: function (value) {
            if (value < 0) {
                throw new Error('Age must be greater than zero');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: function (value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true,
        validate: function (value) {
            if (value.toLocaleLowerCase().includes('password')) {
                throw new Error('Password cannot include password');
            }
        }
    }
});
exports.default = (0, mongoose_1.model)('user', userSchema);

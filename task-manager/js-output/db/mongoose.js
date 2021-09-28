"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/task-manager-api', {});
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
var taskSchema = new mongoose_1.Schema({
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
var UserModel = (0, mongoose_1.model)('user', userSchema);
var TaskModel = (0, mongoose_1.model)('task', taskSchema);
console.log('Yes, it works');
// const user = new UserModel({
//   name: '    Yam-jam',
//   email:  'YAMYAM@JAMJAM.COM',
//   password: 'djwaokjoijk',
// });
// user.save().then(() => {
//   console.log(user);
// }).catch((error) => {
//   console.log('Failure to load save document', error);
// });
var interviewTask = new TaskModel({
    description: '           study',
    completed: true,
});
interviewTask.save().then(function () {
    console.log(interviewTask);
}).catch(function (error) {
    console.log(error);
});

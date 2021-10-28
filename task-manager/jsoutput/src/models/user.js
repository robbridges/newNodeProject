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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const task_1 = __importDefault(require("./task"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be greater than zero');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
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
        validate(value) {
            if (value.toLocaleLowerCase().includes('password')) {
                throw new Error('Password cannot include password');
            }
        }
    },
    tokens: [{
            token: {
                type: String,
                required: true,
            }
        }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true,
});
userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
});
//todo 10/5/2021 you need to find a way to fix the ts error, It should be as simple as adding a new type that extends the model and adding that in the DOC.
userSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return user;
    });
};
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const jwtSecret = process.env.JWT_SECRET;
        const user = this;
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, jwtSecret);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, 8);
        }
        next();
    });
});
userSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        yield task_1.default.deleteMany({ owner: user._id });
        next();
    });
});
exports.default = (0, mongoose_1.model)('user', userSchema);

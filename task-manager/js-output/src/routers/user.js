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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(req.body);
    try {
        yield user.save();
        //@ts-ignore
        const token = yield user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
// simple sign in Method, with our static findByCredentials added to the user model file, returns user if found, or error if not
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const user = yield user_1.default.findByCredentials(req.body.email, req.body.password);
        const token = yield user.generateAuthToken();
        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/users/logout', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        yield req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
}));
// this session deleted all bearer tokens on the current user. We clear out the array by splicing every index, from 0 to the length of the array, then saving the user and their
//new empty array of bearer tokens. 
router.post('/users/logoutAll', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        yield req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get('/users/me', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.user);
}));
// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/users/me', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = Object.keys(req.body);
        updates.forEach((update) => req.user[update] = req.body[update]);
        yield req.user.save();
        res.send(req.user);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/users/me', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await User.findByIdAndDelete(req.user?._id);
        // if (!user) {
        //   return res.status(404).send();
        // }
        yield req.user.remove();
        res.send(req.user);
    }
    catch (e) {
        res.status(500).send();
    }
}));
exports.default = router;

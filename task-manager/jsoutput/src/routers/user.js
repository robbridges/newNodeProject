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
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Accepted formats are jpg, jpeg, and png files only.'));
        }
        cb(null, true);
    }
});
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
// some multer magic to allow users to upload a user avatar easily.
router.post('/users/me/avatar', auth_1.default, upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = yield (0, sharp_1.default)(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    yield req.user.save();
    res.send('file uploaded');
}), (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});
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
router.delete('/users/me/avatar', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.user.avatar = undefined;
    yield req.user.save();
    res.send('Avatar deleted');
}));
router.get('/users/:id/avatar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }
    catch (e) {
        res.status(404).send();
    }
}));
exports.default = router;

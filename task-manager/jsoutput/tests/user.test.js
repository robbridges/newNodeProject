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
const supertest_1 = __importDefault(require("supertest"));
const user_1 = __importDefault(require("../src/models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = require('../src/app');
const userOneId = new mongoose_1.default.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Fake user',
    email: 'Imnotreal@example.com',
    password: '123fourfivesix',
    tokens: [{
            token: jsonwebtoken_1.default.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }]
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany();
    yield new user_1.default(userOne).save();
}));
test('Should signup a new user', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app).post('/users').send({
        name: 'Rob',
        email: 'Rob@Rob.com',
        password: 'robrob777!'
    }).expect(201);
}));
test('Should login existing user', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200);
}));
test('Does not login user with bad info', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app).post('/users/login').send({
        email: 'Imnotrel@example.com',
        password: userOne.password,
    }).expect(400);
}));
test('Should get profile for user', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
}));
test('Should not get profile for unauthenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .get('/users/me')
        .send()
        .expect(401);
}));
test('Should delete user account with authorization credentials sent', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
}));
test('Should fail to delete account without authorzation header', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .delete('/users/me')
        .send()
        .expect(401);
}));

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
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db');
const app = require('../src/app');
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setUpDatabase();
}));
test('Should signup a new user', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app).post('/users').send({
        name: 'Rob',
        email: 'Rob@Rob.com',
        password: 'robrob777!'
    }).expect(201);
    const user = yield user_1.default.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            name: 'Rob',
            email: 'rob@rob.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('robrob777!');
}));
test('Should login existing user', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200);
    const user = yield user_1.default.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
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
    const user = yield user_1.default.findById(userOneId);
    expect(user).toBeNull();
}));
test('Should fail to delete account without authorzation header', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .delete('/users/me')
        .send()
        .expect(401);
}));
test('Should upload an avatar image', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = yield user_1.default.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
}));
test('Should update user fields', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
        name: 'Steve'
    });
    expect(200);
    const user = yield user_1.default.findById(userOneId);
    expect(user.name).toBe('Steve');
}));

import request from 'supertest';
const app = require('../src/app');
import User from '../src/models/user';

const userOne = {
  name: 'Fake user',
  email: 'Imnotreal@example.com',
  password: '123fourfivesix'
}

beforeEach( async() => {
  await User.deleteMany();
  await new User(userOne).save();
})



test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Rob',
    email: 'Rob@Rob.com',
    password: 'robrob777!'
  }).expect(201);
})

test('Should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200)
})

test('Does not login user with bad info', async () => {
  await request(app).post('/users/login').send({
    email: 'Imnotrel@example.com',
    password: userOne.password,
  }).expect(400)
})



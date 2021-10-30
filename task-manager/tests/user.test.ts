import request from 'supertest';
import User from '../src/models/user';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = require('../src/app');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Fake user',
  email: 'Imnotreal@example.com',
  password: '123fourfivesix',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET as string)
  }]
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
});

test('Does not login user with bad info', async () => {
  await request(app).post('/users/login').send({
    email: 'Imnotrel@example.com',
    password: userOne.password,
  }).expect(400)
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete user account with authorization credentials sent', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should fail to delete account without authorzation header', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
});






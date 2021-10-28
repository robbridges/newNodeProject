import request from 'supertest';
const app = require('../src/app');

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'Rob',
    email: 'Rob@Rob.com',
    password: 'robrob777!'
  }).expect(201);
})



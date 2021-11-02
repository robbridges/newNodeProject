import request from 'supertest';
import User from '../src/models/user';
const {userOneId, userOne, setUpDatabase} = require('./fixtures/db');

const app = require('../src/app');



beforeEach( async() => {
  await setUpDatabase();
})



test('Should signup a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'Rob',
    email: 'Rob@Rob.com',
    password: 'robrob777!'
  }).expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Rob',
      email: 'rob@rob.com'
    },
    
    token: user!.tokens[0].token
  })

  expect(user!.password).not.toBe('robrob777!')
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200)

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user!.tokens[1].token);
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
  
  const user = await User.findById(userOneId);
  expect(user).toBeNull();

});

test('Should fail to delete account without authorzation header', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
});

test('Should upload an avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);
  
  const user = await User.findById(userOneId);
  expect(user!.avatar).toEqual(expect.any(Buffer));
});

test('Should update user fields', async () => {
  await request(app)

    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Steve'
    })
    expect(200);
  const user = await User.findById(userOneId);
  expect(user!.name).toBe('Steve');
});






import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../../src/models/user'
import Task from '../../src/models/task'

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

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: 'Fake user2',
  email: 'stillnotreal@example.com',
  password: '123fourfivesix',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET as string)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Fake task',
  completed: false,
  owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Fake task 2',
  completed: true,
  owner: userOne._id
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Fake task 3',
  completed: true,
  owner: userTwo._id
}

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setUpDatabase,
}
import express from 'express';
import User from './models/user';
import Task from './models/task'
require('./db/mongoose');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req,res) => {
  const user = new User(req.body);

  await user.save().then(() => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  await task.save().then(() => {
    res.send(task);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users', async (req, res) => {
  await User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    res.status(500).send(e);
  })
});

app.get('/users/:id', async (req,res) => {
  const _id = req.params.id;

  await User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/tasks', async (req, res) => {
  await Task.find({}).then((tasks) => {
     res.send(tasks);
  }).catch((e) => {
    res.status(500).send(e);
  })
});

app.get('/tasks/:id', async (req,res) => {
  const _id = req.params.id
  await Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }).catch((e) => {
    res.status(500).send(e);
  })
})

app.listen( port, () => {
  console.log(`Listening on ${port}`)
});


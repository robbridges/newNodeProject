import express from 'express';
import Task from '../models/task';
import authenticateUser from '../middleware/auth';

const router = express.Router();


router.post('/tasks', authenticateUser, async (req, res) => {
  // we are going to link specific users to tasks. Users should not be able to do anything if it's not their task.
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get('/tasks', async (req, res) => {
  
  try {
    const tasks = await Task.find({})
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req,res) => {
  const _id = req.params.id
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/tasks/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    

    const task = await Task.findById(req.params.id);

    updates.forEach((update) => task![update] = req.body[update]);

    task!.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
})

export default router;
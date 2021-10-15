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


router.get('/tasks', authenticateUser,  async (req, res) => {
  
  try {
    await req.user.populate('tasks');
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', authenticateUser, async (req,res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({_id, owner: req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/tasks/:id', authenticateUser, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
    

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => task![update] = req.body[update]);

    task!.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', authenticateUser, async (req, res) => {
  try {
    // we actually are changing up how users can view tasks. Only tasks created by that user can patched, deleted. exct, this changes our mongoose function a bit. Nothing too big.
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
})

export default router;
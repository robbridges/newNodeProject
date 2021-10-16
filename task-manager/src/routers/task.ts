import express from 'express';
import Task from '../models/task';
import authenticateUser from '../middleware/auth';
import { number } from 'yargs';

const router = express.Router();

interface Match  {
  completed? : boolean
}



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


// GET /tasks?limit=10
// GeT /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', authenticateUser,  async (req, res) => {
  // /tasks?completed=true will return only tasks for the user that are marked as completed, where as /tasks=false will return all non complete tasks for the user. Though I really do not
  // see this api and a user ever generating 1000 tasks it's a good skill to have, not supply the query string will return all tasks without the filtration.
  const match : Match = {}

  const sort : any= {}

  const limit: string = req.query.limit as string;
  const skip: string = req.query.skip as string;
  const sortBy : string = req.query.sortBy as string;

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    
    const parts : Array<string>= sortBy.split(':');
    
    sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
  }
  

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        sort,
      }
    });
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
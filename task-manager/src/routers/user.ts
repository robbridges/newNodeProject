import express from 'express';
import User from '../models/user';

const router = express.Router();

router.post('/users', async (req,res) => {
  const user = new User(req.body);
  
  
  try {
    await user.save();
    //@ts-ignore
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

// simple sign in Method, with our static findByCredentials added to the user model file, returns user if found, or error if not
router.post('/users/login', async (req, res) => {
  

  try {
    //@ts-ignore
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users/:id', async (req,res) => {
  const _id = req.params.id;
  
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/users/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    const user = await User.findById(req.params.id);
    
    updates.forEach((update) => user![update]   = req.body[update]);

    await user!.save();


    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
import express from 'express';
import User from '../models/user';
import authenticateUser from '../middleware/auth';

// we need to create a mock user interface if the id and email that we'll need for logins, then we need to change expresses Global configuration to add use as an object on the request type
interface User {
  _id: string,
  email: string,
  tokens: string[],
  save: Function
}

interface Token {
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: Token | string;
    }
  }
}

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

router.post('/users/logout', authenticateUser, async (req,res) => {
  try {
    req.user!.tokens = req.user!.tokens.filter((token : any) => {
      return token.token !== req.token;
    })
    await req.user!.save();

    res.send()
  } catch (e) {
    res.status(500).send();
  }
});
// this session deleted all bearer tokens on the current user. We clear out the array by splicing every index, from 0 to the length of the array, then saving the user and their
//new empty array of bearer tokens. 
router.post('/users/logoutAll', authenticateUser, async (req,res) => {
  try {
    req.user!.tokens.splice(0, req.user!.tokens.length);
    await req.user!.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me',authenticateUser , async (req, res) => {
  res.send(req.user)
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
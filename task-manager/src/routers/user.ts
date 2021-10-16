import express from 'express';
import User from '../models/user';
import authenticateUser from '../middleware/auth';
import multer from 'multer';


// we need to create a mock user interface if the id and email that we'll need for logins, then we need to change expresses Global configuration to add use as an object on the request type
interface User {
  _id: string,
  email: string,
  tokens: string[],
  save: Function,
  remove: Function
}

interface Token {
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User | any;
      token?: Token | string;
    }
  }
}

const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Accepted formats are jpg, jpeg, and png files only.'));
    }
    cb(null, true);
  }
});

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

// some multer magic to allow users to upload a user avatar easily.
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
  res.send('file uploaded');
})


// I had to change the FindByIdAnd Update methodology as that overriding any pre logic we would have. This is the correct way to do that. 
router.patch('/users/me', authenticateUser, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach((update) => req.user![update]   = req.body[update]);
    await req.user!.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', authenticateUser, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user?._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user!.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
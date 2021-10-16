import express from 'express';


import userRouter from './routers/user';
import taskRouter from './routers/task';
require('./db/mongoose'); // we actually don't need to do anything with this import, so we can just require it as we never expect to call it. It just injects  Mongoose



const app = express();
const port = process.env.PORT || 3000;

import multer from 'multer';
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a word document'));
    }
    cb(null, true);

    // cb(new Error('File must be a pdf'));
    // cb(null, true);
    // cb(null, false);

  }
});

app.post('/upload', upload.single('upload'), (req,res) => {
    res.send();
});



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen( port, () => {
  console.log(`Listening on ${port}`)
});


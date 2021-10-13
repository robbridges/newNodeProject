import express from 'express';


import userRouter from './routers/user';
import taskRouter from './routers/task';
require('./db/mongoose'); // we actually don't need to do anything with this import, so we can just require it as we never expect to call it. It just injects  Mongoose



const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen( port, () => {
  console.log(`Listening on ${port}`)
});


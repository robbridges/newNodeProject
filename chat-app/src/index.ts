import express from 'express';
import path from 'path'

const app = express();

const port = process.env.PORT || 3000;

const publicPathDir = path.join(__dirname, '../public');

app.use(express.static(publicPathDir));


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

import path = require('path');
import express = require('express');

const publicDir = path.join(__dirname, '../public');


const app = express();
app.use(express.static(publicDir))



app.get('/help', (req, res) => {
  res.send({
    name: 'Rob',
    age: '33'
  });
})

app.get('/about', (req, res) => {
  res.send(
  `<h1>
  About us
  </h1>`);
})

app.get('/weather', (req, res) => {
  res.send({
    forcast: 'sunny',
    location: 'the bronx',
  });
})

let port : number = 3000

app.listen(port, () => {
  console.log(`Server has started on ${port}`);
});




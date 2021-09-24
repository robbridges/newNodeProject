import path = require('path');
import express = require('express');


const publicDir = path.join(__dirname, '../public');


const app = express();

app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'hbs')
app.use(express.static(publicDir))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Rob Bridges'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About us',
  });
});

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Come here if you are seeking help',
    message: 'Yeah this is an unfinished page. No help to find here'
  });
});

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





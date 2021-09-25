import path = require('path');
import express = require('express');
const hbs = require('hbs');


const publicDir = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

const app = express();

app.set('views', viewPaths);
app.set('view engine', 'hbs')

hbs.registerPartials(partialPaths);

app.use(express.static(publicDir));




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
    title: 'Help',
    message: 'Yeah this is an unfinished page. No help to find here'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forcast: 'sunny',
    location: 'the bronx',
  });
});

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: 'Help article not found',
    errorMessage: 'The help article requested could not be found',
  });
})

app.get('*', (req, res) => {
  res.render('notFound', {
    title: 'Page not found',
    errorMessage: 'The page you requested is not found',
  });
});

let port : number = 3000

app.listen(port, () => {
  console.log(`Server has started on ${port}`);
});





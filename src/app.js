const path = require('path');

const express = require('express'); //It generates a function and stores in express variable

const hbs = require('hbs');

const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//app.com
//app.com/help
//app.com/about

//Set up handlebars engine and views location
app.set('view engine', 'hbs'); //to integrate the hbs handlebars with express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    name: 'Abhiram'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Application',
    name: 'Abhiram'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This might be very helpful for you',
    title: 'Help Application',
    name: 'Abhiram'
  });
});

// app.get('/help', (req, res) => {
//   res.send({
//      name: "Abhi", //Express auto detects the arrays, objects or array of object and stringify those to JSON
//      age: 23
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.send('About page!');
// });


app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Address need to be provided!'
    });
  }
  geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
    if(err) {
      return res.send({
        error: `Unable to fetch weather; ${err}`
      });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if(err) {
        res.send({
          error: `Unable to fetch weather; ${err}`
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'Please provide an Search value!'
    });
  }
    res.send({
      product: []
    });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errMessage: 'Help page not found',
    title: 'Error Help page',
    name: 'Abhiram'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errMessage: 'Application page not found',
    title: 'Error page',
    name: 'Abhiram'
  });
});

app.listen(3000, (er) => {
  if(er) {
    console.log(er);
  }
  console.log('Server is starting with port 3000');
});

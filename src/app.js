const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location, partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Dilip'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Welcome to Help Center',
    title: 'Help',
    name: 'Pranav'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({ error: 'Please provide an address' })
  } else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error })
      } 
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          address,
          location,
          forecastData
        })
      })
    })
  }
})

app.get('/product', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  //console.log(req.query.search)
  res.send([
    {
    products: []
    }
  ])
})

app.get('/help/*', (req,res) => {
  res.render('404-page', {
    title: 'Help Section',
    errorMessage: 'Help Articles Not Found',
    name: 'Pranav'
  })
})

app.get('*', (req, res) => {
  res.render('404-page', {
    title: '404 Error',
    errorMessage: 'No Page Found',
    name: 'Dilip'
  })
})


app.listen(port, () => {
  console.log('Server is up and running on! ' + port)
})
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast=require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Establishing Paths
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Use public folder for static assets
app.use(express.static(publicDirPath));


//Initiating use of handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Theodore Esantsi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { desc, current_temp, feels_like, wind_speed }) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: desc,
                temp: current_temp,
                feelslike: feels_like,
                windspeed: wind_speed,
                location: location,
                address: req.query.address
            })
        })
    })

    
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Theodore Esantsi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Theodore Esantsi',
        message: 'This is the help page anything you need can be found here'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404pg', {
        title: 'Ummm...',
        error_message: 'Help page not found...',
        name: 'Theodore Esantsi'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        //Stops function execution preventing a double request
         return res.send({
            error: 'Must prodive a search code'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404pg', {
        title: 'Ummm...',
        error_message: 'Page not found...',
        name: 'Theodore Esantsi'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});
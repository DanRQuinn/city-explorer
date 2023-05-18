'use strict';

//  REQUIRE

require('dotenv').config();
// let data = require('./data/weather.json');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//USE

const app = express();


//  PORT

app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/weather', async (request, response, next) => {
  try {
    // let { lat, lon } = request.query;
    // let searchQuery = request.query.cityData

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${request.query.lat}&lon=${request.query.lon}`

    let weatherData = await axios.get(url);
    let weatherMap = parseWeathers(weatherData.data);
    weatherMap.then(weather => {
      // console.log(weather);
      response.status(200).send(weather);

    })
  } catch (error) {
    next(error);
  }
});

// app.get('/movies', async (request, response, next) => {
//   try {
//     //https://api.themoviedb.org/3/movie/550?api_key=8b762b3c4924b64a719fa0e2c807aa50
//     let movieURL = ``
//   }
// });

function parseWeathers(weatherData) {
  try {
    const weatherSummarize = weatherData.data.map(oneDay => {
      return new Forecast(oneDay);
    });
    return Promise.resolve(weatherSummarize)
  } catch (error) {
    return Promise.reject(error);
  }
}

// TRUST SHEYNA IT WORKS

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// CLASSES

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.high = day.high_temp;
    this.low = day.low_temp;
  }
}

// LISTEN 

app.listen(PORT, () => console.log(`listening on ${PORT}`));

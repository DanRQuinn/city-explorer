import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Weather from './Weather.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      haveCityData: false,
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }

  // WHEN DEALING WITH AXIOS YOU NEED 3 things:
  // - 1) async
  // - 2) await
  // - 3) .data
  handleCitySubmit = async (event) => {
    event.preventDefault();
    try {
      let cityUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      let city = await axios.get(cityUrl);
      // console.log(city);
      this.setState({
        Data1: city.data[0],
        error: false,
        haveCityData: true
      });
    }
    catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An error Occured: ${error.response.status}`
      });
    }
    this.getWeather();
  }

  getWeather = async () => {
    try {
      // let { lat, lon } = this.state.Data1;
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?cityData=${this.state.cityName}`;
      let weatherResponse = await axios.get(weatherUrl);
      let weatherData = weatherResponse.data;
      console.log(weatherData);
      let date = new Date(weatherData.dt * 1000).toLocaleDateString();
      let description = weatherData[0].description;
      this.setState({
        weatherData
      })
      console.log('Date:', date);
      console.log('Description:', description);
    } catch (error) {
      console.log('Error getting weather:', error);
    }
  };


  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }
  render() {
    // console.log(this.state)
    return (
      <>
        <header>
          <h1>Data from an API</h1>
          <form onSubmit={this.handleCitySubmit}>
            <label>
              <input name="city" onChange={this.changeCityInput} />
            </label>
            <Button type="submit" className="button">Explore!</Button>
          </form>
        </header>
        {this.state.error ? <p>{this.state.errorMessage}</p> :
          this.state.haveCityData &&
          <main>
            <Card className='City p-2 h-100%' style={{ width: '75%' }}>
              <Card.Body>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.Data1.lat},${this.state.Data1.lon}&zoom=12`} alt="" />
                <Card.Title>{this.state.cityName}</Card.Title>
                <Card.Text>Lat: {this.state.Data1.lat}</Card.Text>
                <Card.Text>Lon: {this.state.Data1.lon}</Card.Text>
                {this.state.weatherData.length > 0 && <Weather
                  weatherData={this.state.weatherData}
                  cityName={this.state.cityName}
                />}
              </Card.Body>
            </Card>
          </main>
        }
      </>
    );
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  // handleCitySubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     //CHANGE THIS
  //     let cityData = await axios.get(url);

  //     // proof of life:
  //     console.log(cityData.data);

  //     this.setState({
  //       cityData: cityData.data[0]
  //     });
  //     //  console.log(this.state.cityName);
  //   }

  // changeCityInput = (e) => {
  //     this.setState({
  //       cityName: e.target.value
  //     });
  //   }

  handleLocationSubmit = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;

    let cityData = await axios.get(url);

    // proof of life:
    console.log(cityData.data);

    this.setState({
      cityData: cityData.data[0]
    });
  }
  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  render() {
    console.log(this.state.cityData.lat);
    return (
      <>
        <main>
          <div >
          <h1>CITY EXLPORER</h1>
          <form onSubmit={this.handleLocationSubmit}>
            <label>Search for a City!
              <input name="city" onChange={this.changeCityInput} />
            <button type="submit">Explore!</button>
            </label>
          </form>
          </div>
          <Card className='City p-2 h-100%' style={{ width: '75%' }}>
            <Card.Body>
              <Card.Title className="title">{this.state.cityName}</Card.Title>
              <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt={`Map of ${this.state.cityName}`} />
              <Card.Text>Latitude: {this.state.cityData.lon}</Card.Text>
              <Card.Text>Longitude: {this.state.cityData.lat}</Card.Text>
            </Card.Body>
          </Card>
        </main>
      </>
    );
  }
}

export default App;

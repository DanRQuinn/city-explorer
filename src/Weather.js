import React from "react";
import Card from 'react-bootstrap/Card'


class Weather extends React.Component {
  render() {
    return (
      <>
          <Card.Title>Weather in {this.props.cityName}</Card.Title>
          <hr></hr>
        {
          this.props.weatherData.map((forecast, idx) =>
          // key is for mapping over an array
            <div key={idx}>
              <Card.Text>Date: {forecast.date}</Card.Text>
              <Card.Text>If you look outside you'll see: {forecast.description}</Card.Text>
              <Card.Text>High of: {forecast.high}</Card.Text>
              <Card.Text>Low of: {forecast.low}</Card.Text>
              <hr></hr>
            </div>
          )
        }
      </>

    )
  }
}


export default Weather

import React from "react";
import Card from 'react-bootstrap/Card'

class WeatherDay extends React.Component {
  render() {
    return (
      <>
        {this.props.weatherData ? (
          this.props.weatherData.map((forecast, idx) =>
            <Card key={idx} className="weatherDay">
              <Card.Text>Date: {forecast.date}</Card.Text>
              <Card.Text>Forecast: {forecast.description}</Card.Text>
              <Card.Text>High of: {forecast.high}</Card.Text>
              <Card.Text>Low of: {forecast.low}</Card.Text>
              {/* <hr></hr> */}
            </Card>
          )
        ) : (
          <p>loading data; </p>
        )
        }
      </>
    );
  }
}

export default WeatherDay;

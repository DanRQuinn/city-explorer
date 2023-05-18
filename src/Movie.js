import React from "react";
import Card from 'react-bootstrap/Card'

class Movie extends React.Component {
  render() {
    return (
      <>
        <Card.Title>{this.props.cityName} Movies</Card.Title>
        <hr></hr>
        {
          this.props.movieData.map((movie, index) =>
            <div key={index}>
              <Card.Text>Title: {movie.title}</Card.Text>
              <Card.Text>Overview: {movie.overview}</Card.Text>
              <Card.Text>Average # of Votes: {movie.averageVotes}</Card.Text>
              <Card.Text>Total # of Votes: {movie.totalVotes}</Card.Text>
              <Card.Img
                src={`https://image.tmdb.org/t/p/w500${movie.image_url}`}
              />
              <Card.Text>Popularity Level: {movie.popularity}</Card.Text>
              <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
              <hr></hr>
            </div>
          )
        }
      </>


    )
  }
}


export default Movie;

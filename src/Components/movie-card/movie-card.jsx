// import the PropTypes Library
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

// The moviecard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      onClick={() => onMovieClick(movie)}
      variant="link"
      id="moviecard"
      className="h-100"
    >
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

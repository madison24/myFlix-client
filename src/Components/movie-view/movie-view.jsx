import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  const similarMovies = (genreName) =>
    movies.filter(
      (movie) => movie.Genre.Name == genreName && movie._id !== movieId
    );

  return (
    <Container>
      <Row>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </Row>
      <Row>
        <Col>
          <img className="view-image" src={movie.ImagePath}></img>
        </Col>
        <Col>
          <Col className="movieview-paragraph">
            <span>
              <h1 className="title">{movie.Title}</h1>
            </span>
            <span>
              <h2 id="Name-element">Description: </h2>
              <p>{movie.Description}</p>
            </span>
            <span>
              <h2 id="Name-element">Genre: </h2>
              <p>{movie.Genre.Name}</p>
            </span>
            <span>
              <h2 id="Name-element">Director: </h2>
              <p>{movie.Director.Name}</p>
            </span>
            <span>
              <h2 id="Name-element">Actors: </h2>
              <p>{movie.Actors}</p>
            </span>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>
            <h3 className="similar-title">Similar Movies: </h3>
            <span>
              {similarMovies(movie.Genre.Name).map((movie) => (
                <Link id="link-style" to={`/movies/${movie._id}`}>
                  <img className="similar-movie" src={movie.ImagePath} alt="" />
                </Link>
              ))}
            </span>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

//PropType conditions for moviesfromapi

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };

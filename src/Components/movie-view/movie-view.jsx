import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Col } from "react-bootstrap";

// import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  const similarMovies = (genreName) =>
    movies.filter(
      (movie) => movie.Genre.Name == genreName && movie._id !== movieId
    );

  return (
    <div>
      <div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
      <div>
        <img src={movie.ImagePath} className="movie-image" />
      </div>
      <div className="movieview-paragraph">
        <div>
          <span id="Name-element">Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span id="Name-element">Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span id="Name-element">Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span id="Name-element">Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span id="Name-element">Actors: </span>
          <span>{movie.Actors}</span>
        </div>
        <div>
          <span id="Name-element">Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <div>
          <div id="Name-element">Similar Movies: </div>
          <Col className="mb-" md={3}>
            <span>
              {similarMovies(movie.Genre.Name).map((movie) => (
                <Link id="link-style" to={`/movies/${movie._id}`}>
                  <img src={movie.ImagePath} alt="" className="similar-movie" />
                </Link>
              ))}
            </span>
          </Col>
        </div>
      </div>
    </div>
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

import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <div>
      <div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
      <div>
        <img src={movie.ImagePath} className="w-100" />
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

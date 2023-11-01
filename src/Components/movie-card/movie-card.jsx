// import the PropTypes Library
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// The moviecard function component
export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavMovie = () => {
    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Unable to add favorite movie");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavMovie = () => {
    fetch(
      "https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${user.Username/movies/${movie._id}",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Unable to delete");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card id="moviecard">
      <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Card.Img src={movie.ImagePath}></Card.Img>
        </Link>

        {!isFavorite ? (
          <button className="addfav" onClick={addFavMovie}>
            &#9734;
          </button>
        ) : (
          <button className="addfav" onClick={removeFavMovie}>
            &#9733;
          </button>
        )}
        <Link
          id="moviecard-text"
          to={`/movies/${encodeURIComponent(movie._id)}`}
        >
          <Card.Title>{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{movie.Genre.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
};

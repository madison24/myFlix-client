// import the PropTypes Library
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// The moviecard function component
export const MovieCard = ({ movie, token, setUser, user }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
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
        <Link
          id="moviecard-text"
          to={`/movies/${encodeURIComponent(movie._id)}`}
        >
          <Card.Title>{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{movie.GenreName}</Card.Text>

        <Card.Body>
          {!isFavorite ? (
            <Button onClick={addFavoriteMovie}>Add to favorites</Button>
          ) : (
            <Button onClick={removeFavoriteMovie}>Remove favorite</Button>
          )}
        </Card.Body>
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

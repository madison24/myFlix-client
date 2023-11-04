import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profile-view.scss";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState(user.Password);
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);

  const favMov = user.favoriteMovies
    ? movies.filter((movie) => user.favoriteMovies.includes(movie._id))
    : [];

  const [user, setUser] = useState({});

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${localStorage.getItem(
  //       "Username"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((response) => {
  //       console.log(response);

  //       // const y = response.find(
  //       //   (x) => x.Username == localStorage.getItem("Username")
  //       // );
  //       setUser({ ...response });
  //       console.log(y);
  //       const favMov = user.FavoriteMovies
  //         ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id))
  //         : [];

  //       let favoriteMovies = movies.filter((movie) =>
  //         user.FavoriteMovies.includes(movie._id)
  //       );
  //       setFavoriteMovies(favMov);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }, [user]);

  useEffect(() => {
    if (user.favoriteMovies.includes(favMov)) {
      favMov(true);
    }
  }, [user]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    fetch(
      "https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${user.Username}",
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          alert("Update successful");
        } else {
          const e = await response.text();
          console.log(e);
          alert("Update failed.");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      });
  };

  const handleDelete = () => {
    fetch(
      "https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${user.Username}",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert("Account has been deleted");
        window.location.replace("/signup");
      } else {
        alert("Unable to delete account");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 id="profile-header">Update User Information</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label id="user-info">Username:</Form.Label>
              <Form.Control
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label id="user-info">Password:</Form.Label>
              <Form.Control
                type="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label id="user-info">Email:</Form.Label>
              <Form.Control
                type="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label id="user-info">Birthday:</Form.Label>
              <Form.Control
                type="Date"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" id="update-button" onClick={handleUpdate}>
              Update
            </Button>
            <div />
            <Button id="delete-button" onClick={handleDelete}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <h2 id="profile-header">Favorite Movies</h2>
        {/* {favoriteMovies.map((movie) => { */}
        {favMov.map((movie) => {
          return (
            <Col md={8} key={movie._id}>
              <MovieCard
                movie={movie}
                token={token}
                setUser={setUser}
                user={user}
              ></MovieCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

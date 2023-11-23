import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./profile-view.scss";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  onDelete,
  movie,
  token,
  setUser,
  movies,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favMov = storedUser.FavoriteMovies
    ? movies.filter((movie) => storedUser.FavoriteMovies.includes(movie._id))
    : [];
  console.log(favMov);
  console.log(movies);
  console.log(storedUser);

  const updateUser = (event) => {
    event.preventDefault();

    const inputData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    console.log("inputData: ", inputData);

    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${storedUser.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(inputData),
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("User updated");
        console.log("User updated: ", inputData);
        fetchUpdatedUser(inputData.Username);
      } else {
        alert("Unable to update user");
      }
    });
  };

  const fetchUpdatedUser = (newUsername) => {
    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${newUsername}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Local storage updated: ", data);
          window.location.reload();
        } else {
          alert("Unable to update local storage");
        }
      });
  };

  const deleteAccount = () => {
    fetch(
      `https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/${storedUser.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        onDelete();
        localStorage.clear();
        alert("Account deleted");
        window.location.replace("/signup");
      } else {
        alert("Unable to delete account");
      }
    });
  };

  return (
    <Col>
      <Row>
        <Col>
          <Row>
            {" "}
            {/* Display user information */}
            <h3 id="profile-header">User Profile</h3>
            <div>
              <span>Username: </span>
              <span>{storedUser.Username}</span>
            </div>
            <div>
              <span>Email: </span>
              <span>{storedUser.Email}</span>
            </div>
            <div>
              <span>Date of Birth: </span>
              <span>{storedUser.Birthday.slice(0, 10)}</span>
            </div>
          </Row>
        </Col>
        <Col>
          {" "}
          {/* Update user info */}
          <h3 id="profile-header">Update User Information</h3>
          <Form onSubmit={updateUser}>
            <Form.Group controlId="formUsername">
              <Form.Label id="user-info">Username: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label id="user-info">Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label id="user-info">Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label id="user-info">Birthday: </Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button id="update-button" type="submit">
              Update
            </Button>

            <Button id="delete-button" type="submit" onClick={deleteAccount}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {" "}
        <h3 id="profile-header">Favorite Movies</h3>
        <>
          {favMov.map((movie) => {
            return (
              <Col key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            );
          })}
        </>
      </Row>
    </Col>
  );
};

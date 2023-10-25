import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import ".profile-view.scss";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState(user.Password);
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);

  const favMov = user.favoriteMovies
    ? movies.filter((movie) => user.favoriteMovies.includes(movie._id))
    : [];

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
      <Row className="justify-content-md-center">
        <h2>Favorite Movies</h2>
        {favMov.map((movie) => {
          return (
            <Col key={movie._id} className="m-3">
              <MovieCard
                movie={movie}
                token={token}
                setUser={setUser}
                user={user}
              />
            </Col>
          );
        })}
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Update User Information</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="Date"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={handleDelete}>Delete Account</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

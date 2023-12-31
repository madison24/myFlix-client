import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchBar } from "../search-bar/search-bar";
import { Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  // use whatever is in localstorage as the default value of user and token states
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [filteredGenre, setFilteredGenre] = useState([...movies]);

  // search all movies
  const handleSearch = (search) => {
    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(search.toLowerCase())
    );
    setMovies(filteredMovies);
    setFilteredGenre(filteredMovies);
  };

  // filter by genre

  const handleGenreFilter = (e) => {
    const genre = e.target.value;

    const newMovies = movies.filter((movie) => {
      if (movie.Genre.Name === genre) {
        return movie;
      } else {
        if (genre === "") {
          return movie;
        }
      }
    });

    setFilteredGenre(newMovies);
    console.log(filteredGenre);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/movies", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured.toString(),
            Actors: movie.Actors,
          };
        });

        setMovies(moviesFromApi);
        setFilteredGenre(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Row>
                      <Col className="mb-4" md={6}>
                        <SearchBar onSearch={handleSearch} />
                      </Col>

                      <Col className="mb-5" md={3}>
                        <Form.Select onChange={handleGenreFilter}>
                          <option value="" selected>
                            All genres
                          </option>
                          <option value={"Comedy"}>Comedy</option>
                          <option value={"Animated"}>Animated</option>
                          <option value={"Thriller"}>Thriller</option>
                          <option value={"Historical Romance"}>
                            Historical Romance
                          </option>
                        </Form.Select>
                      </Col>
                    </Row>
                    {filteredGenre.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          setUser={setUser}

                          // addToFavorites={addToFavorites}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Pride and Prejudice",
      description:
        "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?",
      genre: "Historical Romance",
      director: "Joe Wright",
      actors: "Keira Knightley",
      featured: true,
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg",
    },
    {
      id: 2,
      title: "Bridesmaids",
      description:
        "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
      genre: "Comedy",
      director: "Judd Apatow",
      actors: "Kristen Wiig",
      featured: true,
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_.jpg",
    },
    {
      id: 3,
      title: "Promising Young Woman",
      description:
        "A woman seeks vengeance on those who played a role in her traumatizing past.",
      genre: "Thriller",
      director: "Emerald Fennell",
      actors: "Carey Mulligan",
      featured: true,
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

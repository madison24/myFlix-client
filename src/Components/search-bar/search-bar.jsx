import { useState } from "react";
import { Form } from "react-bootstrap";

export const SearchBar = ({ onSearch }) => {
  const [searchMovie, setSearchMovie] = useState("");

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchMovie(newSearch);

    if (newSearch === "") {
      onSearch("");
    } else {
      onSearch(newSearch);
    }
  };

  return (
    <Form>
      <Form.Control
        id="search-bar"
        type="text"
        placeholder="Search movies . . ."
        value={searchMovie}
        onChange={handleSearchChange}
      />
    </Form>
  );
};

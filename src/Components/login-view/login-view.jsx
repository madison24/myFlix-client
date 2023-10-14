import React from "react";

export const LoginView = () => {
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    fetch(
      "https://myflixmovies-api-16e0c1ad8aff.herokuapp.com/users/login.json",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" required />
      </label>
      <label>
        Password:
        <input type="password" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

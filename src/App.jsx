import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoviesHandler() {
    setIsLoading(true); // Set isLoading to true when fetching starts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        const transformedMovies = data.map(movieData => {
          return {
            id: movieData.id,
            title: movieData.title,
            openingText: movieData.body,
            releaseDate: new Date().toISOString() // Just a placeholder date
          }
        })
        setMovies(transformedMovies);
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set isLoading to false on error
      })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <div>Loading...</div> // Show loading indicator when isLoading is true
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;

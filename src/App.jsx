import React, { useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true); // Set isLoading to true when fetching starts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.map((movieData) => ({
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.body,
          releaseDate: new Date().toISOString(), 
        }));
        setMovies(transformedMovies);
        setIsLoading(false); 
        setError(null);
        setRetryCount(0);
        clearInterval(retryIntervalId); 
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong');
        setIsLoading(false); 
        setRetryCount((prevRetryCount) => prevRetryCount + 1);
      });
  }, [retryIntervalId]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const cancelRetryHandler = useCallback(() => {
    clearInterval(retryIntervalId);
    setIsLoading(false);
    setError('Cancelled successfully, try again later');
    setRetryCount(0);
  }, [retryIntervalId]);

  useEffect(() => {
    let intervalId;
    if (retryCount > 0) {
      intervalId = setInterval(fetchMoviesHandler, 5000);
      setRetryIntervalId(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [retryCount, fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        {isLoading ? (
          <div>Loading...Please wait...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MoviesList movies={movies} />
        )}
        {retryCount > 0 && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;

  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  useEffect(() => {
    let intervalId;
    if (retryCount > 0) {
      intervalId = setInterval(fetchMoviesHandler, 5000);
      setRetryIntervalId(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [retryCount]);

  async function fetchMoviesHandler() {
    setIsLoading(true); // Set isLoading to true when fetching starts
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const transformedMovies = data.map(movieData => {
        return {
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.body,
          releaseDate: new Date().toISOString() // Just a placeholder date
        }
      });
      setMovies(transformedMovies);
      setIsLoading(false); // Set isLoading to false when data is fetched
      setError(null);
      setRetryCount(0);
      clearInterval(retryIntervalId); // Stop retrying when data is fetched successfully
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Retrying...');
      setIsLoading(false); // Set isLoading to false on error
      setRetryCount(prevRetryCount => prevRetryCount + 1);
    }
  }

  function cancelRetryHandler() {
    clearInterval(retryIntervalId);
    setIsLoading(false);
    setError(null);
    setRetryCount(0);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={isLoading}>Fetch Movies</button>
        
      </section>
      <section>
        {isLoading ? (
          <div>Loading...</div> // Show loading indicator when isLoading is true
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MoviesList movies={movies} />
        )}
        {retryCount > 0 && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;

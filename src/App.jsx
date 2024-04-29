import React, { useState, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const movie = {title: '',
  openingText: '',
  releaseDate: ''}
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(movie);

  const addMovieHandler = async (movie) => {

    const res = await fetch('https://react-movie-post-49b06-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    
    });

    const data = await res.json();
    setMovies((prevMovies) => [...prevMovies, { id: data.name, ...movie }]);
    setNewMovie({
      title: '',
      openingText: '',
      releaseDate: ''
    });
  };

  const deleteMovieHandler = async (id) => {
    await fetch(`https://react-movie-post-49b06-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE'
    });

    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const fetchMoviesHandler = useCallback(() => {
    fetch('https://react-movie-post-49b06-default-rtdb.firebaseio.com/movies.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies.');
        }
        return response.json();
      })
      .then((data) => {
        const loadedMovies = [];
        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate
          });
        }
        setMovies(loadedMovies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
      <section className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">Movie Collection</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <br />
            <input
              name="title"
              type="text"
              value={newMovie.title}
              onChange={inputChangeHandler}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4 items-start">
            <label htmlFor="openingText">Opening Text</label>
            <br />
            <input
              id="openingText"
              name="openingText"
              value={newMovie.openingText}
              onChange={inputChangeHandler}
              placeholder="Enter opening text"
              required
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="releaseDate">Release Date</label>
            <br />
            <input
              id="releaseDate"
              name="releaseDate"
              type="text"
              value={newMovie.releaseDate}
              onChange={inputChangeHandler}
              placeholder="Enter release date"
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={() => addMovieHandler(newMovie)}
          >
            Add Movie
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={fetchMoviesHandler}
          >
            Fetch Movies
          </button>
        </form>
        <MoviesList movies={movies} onDelete={deleteMovieHandler} />
      </section>
    </React.Fragment>
  );
}

export default App;

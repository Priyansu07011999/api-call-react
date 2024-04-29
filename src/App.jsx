import React, { useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: ''
  });

  const addMovieHandler = useCallback(() => {
    if(newMovie.title.trim() !== '' && newMovie.openingText.trim() !== '' && newMovie.releaseDate.trim() !== ''){
      const movie = {
        id: Math.random().toString(),
        ...newMovie
      };
      console.log(movie); 
      setMovies((prevMovies) => [
        ...prevMovies,
        movie
      ]);
      setNewMovie({
        title: '',
        openingText: '',
        releaseDate: ''
      });
    } 
  }, [newMovie]);

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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="title">Title</label><br />
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
            <label htmlFor="openingText">Opening Text</label><br />
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
            <label htmlFor="releaseDate">Release Date</label><br />
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addMovieHandler}
          >
            Add Movie
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}

export default App;

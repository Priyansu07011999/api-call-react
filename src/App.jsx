import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movie, setMovie] = useState([])

  function fetchMoviesHandler(){
    fetch('https://swapi.dev/api/films').then((res) => res.json())
                                        .then((data) => {
                                          const transformMovies = data.results.map(movieData => {
                                            return {
                                              id: movieData.episode_id,
                                              title: movieData.title,
                                              openingText: movieData.opening_crawl,
                                              releaseDate: movieData.release_date
                                            }
                                          })
                                          setMovie(transformMovies)
                                      })

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movie} />
      </section>
    </React.Fragment>
    
  );
}

export default App;

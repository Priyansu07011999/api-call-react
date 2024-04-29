// Inside MoviesList.js

import React from 'react';

const MoviesList = ({ movies, onDelete }) => {
  const deleteHandler = (id) => {
    onDelete(id);
  };

  return (
    <ul className="divide-y divide-gray-200">
      {movies.map((movie) => (
        <li key={movie.id} className="py-4 flex">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{movie.title}</p>
            <p className="text-sm text-gray-500">{movie.openingText}</p>
            <p className="text-sm text-gray-500">{movie.releaseDate}</p>
          </div>
          <button
            className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => deleteHandler(movie.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;

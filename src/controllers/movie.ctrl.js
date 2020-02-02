const remove = require('lodash/remove')

const movies = require('../data/movies.json')
const { generateId } = require('../utils')
const { searchMovies, filterMovies, sortMovies, paginateMovies } = require('../utils/search')

const getMovies = async (query) => {
  const foundMovies = searchMovies(movies, query)
  const filteredMovies = filterMovies(foundMovies, query)
  const sortedMovies = sortMovies(filteredMovies, query)
  const paginatedMovies = paginateMovies(sortedMovies, query)

  return paginatedMovies
}

const getMovieById = async (movieId) => {
  return movies.find((movie) => movie.id === movieId)
}

const deleteMovie = async (movieId) => {
  const removedElements = remove(movies, (m) => m.id === movieId)

  return removedElements.length
}

const addMovie = async (movie) => {
  const newMovie = {
    ...movie,
    id: generateId(),
  }

  movies.push(newMovie)

  return newMovie
}

const updateMovie = async (movie) => {
  const movieIndex = movies.findIndex((m) => m.id === movie.id)

  if (movieIndex < 0) {
    return null
  }

  movies[movieIndex] = movie

  return movie
}

module.exports = {
  getMovies,
  getMovieById,
  deleteMovie,
  addMovie,
  updateMovie,
}

const movies = require('../data/movies.json')
const genreSet = new Set()
movies.forEach(movie => movie.genres.forEach(genre => genreSet.add(genre)))
const genres = Array.from(genreSet)

const getGenres = () => genres

module.exports = {
  getGenres,
}

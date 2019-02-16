const pick = require('lodash/pick')

// HELPERS
// =============================================

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const addImageHostname = (uri) => {
  return `${IMAGE_URL}${uri}`
}

const goodFields = [
  'id',
  'title',
  'tagline',
  'vote_average',
  'vote_count',
  'release_date',
  'poster_path',
  'overview',
  'budget',
  'revenue',
  'genres',
  'runtime',
]

// Functions
// =============================================

// Present movie to have only allowed fields
const presentMovie = (movie) => {
  return pick(movie, goodFields)
}

// Map all movies with present function
const presentMovies = (ctx, presentor = presentMovie) => {
  const { state: { Movies, totalAmount }, query: { offset, limit } } = ctx

  return {
    data: Movies.map((item) => presentor(item)),
    total: totalAmount,
    offset,
    limit,
  }
}

// Present data to readable JSON
const presentJSONData = (data) => {
  return JSON.stringify(data, null, 2)
}

// Present Movie data structure
const restoreMovieStructure = (data) => {
  return {
    ...data,
    backdrop_path: data.backdrop_path && addImageHostname(data.backdrop_path),
    poster_path: data.poster_path && addImageHostname(data.poster_path),
    belongs_to_collection: data.belongs_to_collection && {
      ...data.belongs_to_collection,
      backdrop_path: data.belongs_to_collection.backdrop_path && addImageHostname(data.belongs_to_collection.backdrop_path),
      poster_path: data.belongs_to_collection.poster_path && addImageHostname(data.belongs_to_collection.poster_path),
    },
    genres: data.genres && data.genres.map(x => x.name),
  }
}

module.exports = {
  presentJSONData,
  presentMovie,
  presentMovies,
  restoreMovieStructure,
}

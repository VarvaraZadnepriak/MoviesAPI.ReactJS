const path = require('path')

const API_KEY = process.env.API_KEY
const PAGES = process.env.PAGES || 10

const axios = require('axios')
const fs = require('fs')

const { restoreMovieStructure, presentJSONData } = require('./utils/presenters')

const sleep = (ms = 0) => {
  console.log(`Sleep for ${ms} ms`)
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getMovieByID = async ({ id }) => {
  console.log(`Download movie ID: ${id} `)
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)

  await sleep(50)

  return restoreMovieStructure(data)
}

const getMoviesByPage = async (page) => {
  console.log(`Download page: ${page}`)
  const { data: { results = [] } } = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${API_KEY}`)
  const movies = []

  for (let i = 0; i < results.length; i++) {
    const data = await getMovieByID(results[i])

    movies.push(data)
  }

  return movies
}

const getMovies = async (pages) => {
  const filePath = path.join(__dirname, 'data/movies.json')
  let movies = []

  for (let i = 1; i <= pages; i += 1) {
    const list = await getMoviesByPage(i)

    movies = movies.concat(list)
  }

  fs.writeFileSync(filePath, presentJSONData(movies))
}

console.log('Start scraping', PAGES, 'pages')
getMovies(PAGES)
  .catch((err) => console.log(err))

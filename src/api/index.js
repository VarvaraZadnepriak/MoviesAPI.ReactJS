const fs = require('fs')
const KoaRouter = require('koa-router')

const { presentMovie, presentMovies } = require('../utils/presenters')
const searchMiddleware = require('./middleware/search')
const filterMiddleware = require('./middleware/filter')
const sortMiddleware = require('./middleware/sort')
const paginationMiddleware = require('./middleware/pagination')

const apiSpec = fs.readFileSync(`${__dirname}/../../api.json`)

const api = KoaRouter()

api.get('/api.json',
  (ctx, next) => {
    ctx.status = 200
    ctx.body = apiSpec.toString()
  })

api.get('/movies',
  searchMiddleware,
  filterMiddleware,
  sortMiddleware,
  paginationMiddleware,
  // Return movies
  async (ctx, next) => {
    ctx.status = 200
    ctx.body = presentMovies(ctx)
  })

api.get('/movies/:id',
  async (ctx, next) => {
    const id = parseInt(ctx.params.id, 10)

    const movie = ctx.state.Movies.find((x) => x.id === id)

    ctx.status = 200
    ctx.body = presentMovie(movie)
  })

module.exports = exports = api

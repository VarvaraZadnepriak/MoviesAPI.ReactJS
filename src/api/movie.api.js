const KoaRouter = require('koa-router')

const { MovieBaseModel, MovieModel } = require('../models/movie.model')
const movieCtrl = require('../controllers/movie.ctrl')

const api = KoaRouter()

const validateRequestBody = (ctx, model, body) => {
  const { error } = model.validate(body)

  if (error) {
    ctx.status = 400
    ctx.body = { messages: error.details.map((e) => e.message) }
  } else {
    return true
  }
}

api.get('/movies',
  async (ctx, _next) => {
    const { offset, limit } = ctx.query
    const { totalAmount, data } = await movieCtrl.getMovies(ctx.query)

    ctx.status = 200
    ctx.body = {
      totalAmount,
      data,
      offset,
      limit,
    }
  })

api.get('/movies/:id',
  async (ctx, _next) => {
    const id = parseInt(ctx.params.id, 10)

    const movie = await movieCtrl.getMovieById(id)

    if (movie) {
      ctx.status = 200
      ctx.body = movie
    } else {
      ctx.status = 404
    }
  })

api.delete('/movies/:id',
  async (ctx, _next) => {
    const id = parseInt(ctx.params.id, 10)

    const removedCount = await movieCtrl.deleteMovie(id)

    ctx.status = removedCount ? 204 : 404
  })

api.post('/movies',
  async (ctx, _next) => {
    const movie = ctx.request.body

    if (!validateRequestBody(ctx, MovieBaseModel, movie)) {
      return
    }

    const newMovie = await movieCtrl.addMovie(movie)

    ctx.status = 201
    ctx.body = newMovie
  })

api.put('/movies',
  async (ctx, _next) => {
    const movie = ctx.request.body

    if (!validateRequestBody(ctx, MovieModel, movie)) {
      return
    }

    const updatedMovie = await movieCtrl.updateMovie(movie)

    if (updatedMovie) {
      ctx.status = 200
      ctx.body = updatedMovie
    } else {
      ctx.status = 404
    }
  })

module.exports = exports = api

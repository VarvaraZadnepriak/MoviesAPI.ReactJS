const fs = require('fs')
const KoaRouter = require('koa-router')

const ctrl = require('../controllers')

const swaggerSpec = fs.readFileSync(`${__dirname}/../../swagger.yaml`)

const api = KoaRouter()

api.get('/swagger.yaml',
  (ctx, _next) => {
    ctx.status = 200
    ctx.body = swaggerSpec.toString()
  })

api.get('/movies',
  async (ctx, _next) => {
    const { offset, limit } = ctx.query
    const { totalAmount, data } = await ctrl.getMovies(ctx.query)

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

    const movie = await ctrl.getMovieById(id)

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

    const removedCount = await ctrl.deleteMovie(id)

    ctx.status = removedCount ? 204 : 404
  })

api.post('/movies',
  async (ctx, _next) => {
    console.log('Request body: ', ctx.request.body)

    const newMovie = await ctrl.addMovie(ctx.request.body)

    ctx.status = 201
    ctx.body = newMovie
  })

api.put('/movies',
  async (ctx, _next) => {
    console.log('Request body: ', ctx.request.body)

    const updatedMovie = await ctrl.updateMovie(ctx.request.body)

    if (updatedMovie) {
      ctx.status = 200
      ctx.body = updatedMovie
    } else {
      ctx.status = 404
    }
  })

module.exports = exports = api

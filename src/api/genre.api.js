const KoaRouter = require('koa-router')
const genreCtrl = require('../controllers/genre.ctrl')
const api = KoaRouter()

api.get('/genres',
  (ctx, _next) => {
    const genres = genreCtrl.getGenres()
    ctx.status = 200
    ctx.body = genres
  })

module.exports = exports = api

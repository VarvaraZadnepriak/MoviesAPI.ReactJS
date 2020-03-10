const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const koaSwagger = require('koa2-swagger-ui')

const { parseQuery } = require('./utils')
const swaggerApi = require('./api/swagger.api')
const movieApi = require('./api/movie.api')

const app = new Koa()
  .use(cors())
  .use(
    koaSwagger({
      routePrefix: '/api-docs',
      swaggerOptions: {
        url: '/swagger.yaml',
      },
    }),
  )
  .use(bodyParser())
  .use(parseQuery)
  .use(swaggerApi.routes())
  .use(swaggerApi.allowedMethods())
  .use(movieApi.routes())
  .use(movieApi.allowedMethods())

module.exports = exports = app

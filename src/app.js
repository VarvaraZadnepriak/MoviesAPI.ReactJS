const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const koaSwagger = require('koa2-swagger-ui')

const { updateContext, parseQuery } = require('./utils')
const api = require('./api')

const app = new Koa()
  .use(cors())
  .use(
    koaSwagger({
      routePrefix: '/api-docs',
      swaggerOptions: {
        url: '/api.json',
      },
    }),
  )
  .use(updateContext)
  .use(parseQuery)
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods())

module.exports = exports = app

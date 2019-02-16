const Koa = require('koa')

const app = require('../app')

// console.log(JSON.stringify(app, null, 2))
// console.log(app.context)

describe('App', () => {
  it('should have correct instance', () => {
    expect(app).toBeInstanceOf(Koa)
  })

  it('should have listen method', () => {
    expect(app.listen).toBeInstanceOf(Function)
  })
})

const Koa = require('koa')

const app = require('../app')

describe('App', () => {
  it('should have correct instance', () => {
    expect(app).toBeInstanceOf(Koa)
  })
})

const filter = require('../filter')

describe('Middleware :: Filter', () => {
  let defaultCtx = {}

  beforeEach(() => {
    defaultCtx = {
      query: {},
      state: {
        Movies: [
          { genres: ['1', '2'] },
          { genres: ['1', '2'] },
          { genres: ['1', '3'] },
          { genres: ['3', '2'] },
          {},
        ],
      },
    }
  })

  it('should return function', () => {
    expect(filter).toBeInstanceOf(Function)
  })

  it('should call `next` callback', () => {
    const next = jest.fn()

    filter(defaultCtx, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should filter by signle genre', () => {
    const next = jest.fn()
    defaultCtx.query.filter = '1'

    filter(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { genres: ['1', '2'] },
      { genres: ['1', '2'] },
      { genres: ['1', '3'] },
    ])
  })

  it('should filter by two genres', () => {
    const next = jest.fn()
    defaultCtx.query.filter = '1,3'

    filter(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { genres: ['1', '3'] },
    ])
  })
})

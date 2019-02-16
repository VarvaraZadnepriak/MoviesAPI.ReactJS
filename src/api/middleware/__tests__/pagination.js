const pagination = require('../pagination')

const MOVIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

describe('Middleware :: Pagination', () => {
  let defaultCtx = {}

  beforeEach(() => {
    defaultCtx = {
      query: {},
      state: {
        Movies: [...MOVIES],
      },
    }
  })

  it('should return function', () => {
    expect(pagination).toBeInstanceOf(Function)
  })

  it('should call `next` callback', () => {
    const next = jest.fn()

    pagination(defaultCtx, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should paginate with given values', () => {
    const next = jest.fn()
    defaultCtx.query.offset = 5
    defaultCtx.query.limit = 5

    pagination(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([6, 7, 8, 9, 10])
  })
})

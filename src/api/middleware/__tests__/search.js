const search = require('../search')

describe('Middleware :: Search', () => {
  let defaultCtx = {}

  beforeEach(() => {
    defaultCtx = {
      query: {},
      state: {
        Movies: [
          { title: '12345' },
          { title: '123ooo123' },
        ],
      },
    }
  })

  it('should return function', () => {
    expect(search).toBeInstanceOf(Function)
  })

  it('should call `next` callback', () => {
    const next = jest.fn()

    search(defaultCtx, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should search to specific item by title', () => {
    const next = jest.fn()
    defaultCtx.query.search = 'ooo'
    defaultCtx.query.searchBy = 'title'

    search(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '123ooo123' },
    ])
  })

  describe('should search to specific item by genres', () => {
    it('#1', () => {
      const next = jest.fn()
      defaultCtx.query.search = 'Ooo'
      defaultCtx.query.searchBy = 'genres'
      defaultCtx.state.Movies = [
        { genres: ['aaa', 'bbb'] },
        { genres: ['ccc', 'Ooo', 'fff'] },
      ]

      search(defaultCtx, next)

      expect(defaultCtx.state.Movies).toEqual([
        { genres: ['ccc', 'Ooo', 'fff'] },
      ])
    })

    it('#2', () => {
      const next = jest.fn()
      defaultCtx.query.search = 'rrr'
      defaultCtx.query.searchBy = 'genres'
      defaultCtx.state.Movies = [
        { genres: ['aaa', 'bbb'] },
        { genres: ['ccc', 'ooo', 'fff'] },
      ]

      search(defaultCtx, next)

      expect(defaultCtx.state.Movies).toEqual([
      ])
    })
  })
})

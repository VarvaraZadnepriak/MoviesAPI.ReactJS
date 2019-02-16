const { presentMovies } = require('../presenters')

describe('Utilites :: presentMovies', function () {
  let defaultCtx = []

  beforeEach(() => {
    defaultCtx = {
      query: { offset: 0, limit: 10 },
      state: {
        Movies: [
          { field1: '1' },
          { field1: '2' },
          { field1: '3' },
        ],
        totalAmount: 3,
      },
    }
  })

  it('should return function', () => {
    expect(presentMovies).toBeInstanceOf(Function)
  })

  it('should present items correctly', () => {
    const data = presentMovies(defaultCtx)

    expect(data).toEqual({
      data: [
        {},
        {},
        {},
      ],
      total: 3,
      offset: 0,
      limit: 10,
    })
  })
})

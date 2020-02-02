const { paginateMovies } = require('../search')

const MOVIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

describe('Utils :: Pagination', () => {
  it('should return function', () => {
    expect(paginateMovies).toBeInstanceOf(Function)
  })

  it('should paginate with given values', () => {
    const query = {
      offset: 5,
      limit: 5,
    }

    const paginatedMovies = paginateMovies(MOVIES, query)

    expect(paginatedMovies.data).toEqual([6, 7, 8, 9, 10])
  })
})

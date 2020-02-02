const { filterMovies } = require('../search')

const MOVIES = [
  { genres: ['1', '2'] },
  { genres: ['1', '2'] },
  { genres: ['1', '3'] },
  { genres: ['3', '2'] },
  {},
]

describe('Utils :: Filter', () => {
  it('should return function', () => {
    expect(filterMovies).toBeInstanceOf(Function)
  })

  it('should filter by signle genre', () => {
    const query = {
      filter: '1',
    }

    const filteredMovies = filterMovies(MOVIES, query)

    expect(filteredMovies).toEqual([
      { genres: ['1', '2'] },
      { genres: ['1', '2'] },
      { genres: ['1', '3'] },
    ])
  })

  it('should filter by two genres', () => {
    const query = {
      filter: '1,3',
    }

    const filteredMovies = filterMovies(MOVIES, query)

    expect(filteredMovies).toEqual([
      { genres: ['1', '3'] },
    ])
  })
})

const { searchMovies } = require('../search')

const MOVIES = [
  { title: '12345' },
  { title: '123ooo123' },
]

describe('Utils :: Search', () => {
  it('should return function', () => {
    expect(searchMovies).toBeInstanceOf(Function)
  })

  it('should search to specific item by title', () => {
    const query = {
      search: 'ooo',
      searchBy: 'title',
    }

    const foundMovies = searchMovies(MOVIES, query)

    expect(foundMovies).toEqual([
      { title: '123ooo123' },
    ])
  })

  describe('should search to specific item by genres', () => {
    it('#1', () => {
      const query = {
        search: 'Ooo',
        searchBy: 'genres',
      }
      const movies = [
        { genres: ['aaa', 'bbb'] },
        { genres: ['ccc', 'Ooo', 'fff'] },
      ]

      const foundMovies = searchMovies(movies, query)

      expect(foundMovies).toEqual([
        { genres: ['ccc', 'Ooo', 'fff'] },
      ])
    })

    it('#2', () => {
      const query = {
        search: 'rrr',
        searchBy: 'genres',
      }
      const movies = [
        { genres: ['aaa', 'bbb'] },
        { genres: ['ccc', 'ooo', 'fff'] },
      ]

      const foundMovies = searchMovies(movies, query)

      expect(foundMovies).toEqual([
      ])
    })
  })
})

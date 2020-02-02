const { sortMovies } = require('../search')

const MOVIES = [
  { title: '987ooo987', id: 2 },
  { title: '12345', id: 10 },
  { title: '123ooo123', id: 1 },
]

describe('Utils :: Sort movies', () => {
  it('should return function', () => {
    expect(sortMovies).toBeInstanceOf(Function)
  })

  it('should sort array by string field ASC', () => {
    const query = {
      sortBy: 'title',
      sortOrder: 'asc',
    }

    const sortedMovies = sortMovies(MOVIES, query)

    expect(sortedMovies).toEqual([
      { title: '12345', id: 10 },
      { title: '123ooo123', id: 1 },
      { title: '987ooo987', id: 2 },
    ])
  })

  it('should sort array by string field DESC', () => {
    const query = {
      sortBy: 'title',
      sortOrder: 'desc',
    }

    const sortedMovies = sortMovies(MOVIES, query)

    expect(sortedMovies).toEqual([
      { title: '987ooo987', id: 2 },
      { title: '123ooo123', id: 1 },
      { title: '12345', id: 10 },
    ])
  })

  it('should sort array by number field ASC', () => {
    const query = {
      sortBy: 'id',
      sortOrder: 'asc',
    }

    const sortedMovies = sortMovies(MOVIES, query)

    expect(sortedMovies).toEqual([
      { title: '123ooo123', id: 1 },
      { title: '987ooo987', id: 2 },
      { title: '12345', id: 10 },
    ])
  })

  it('should sort array by number field DESC', () => {
    const query = {
      sortBy: 'id',
      sortOrder: 'desc',
    }

    const sortedMovies = sortMovies(MOVIES, query)

    expect(sortedMovies).toEqual([
      { title: '12345', id: 10 },
      { title: '987ooo987', id: 2 },
      { title: '123ooo123', id: 1 },
    ])
  })

  it('should not fail if field is not presented', () => {
    const query = {
      sortBy: 'description',
      sortOrder: 'asc',
    }

    const sortedMovies = sortMovies(MOVIES, query)

    expect(sortedMovies).toEqual([
      { title: '987ooo987', id: 2 },
      { title: '12345', id: 10 },
      { title: '123ooo123', id: 1 },
    ])
  })
})

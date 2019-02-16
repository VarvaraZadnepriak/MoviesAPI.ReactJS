const sort = require('../sort')

describe('Middleware :: Search', () => {
  let defaultCtx = {}

  beforeEach(() => {
    defaultCtx = {
      query: {},
      state: {
        Movies: [
          { title: '987ooo987', id: 2 },
          { title: '12345', id: 10 },
          { title: '123ooo123', id: 1 },
        ],
      },
    }
  })

  it('should return function', () => {
    expect(sort).toBeInstanceOf(Function)
  })

  it('should call `next` callback', () => {
    const next = jest.fn()

    sort(defaultCtx, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should sort array by string field ASC', () => {
    const next = jest.fn()
    defaultCtx.query.sortBy = 'title'
    defaultCtx.query.sortOrder = 'asc'

    sort(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '12345', id: 10 },
      { title: '123ooo123', id: 1 },
      { title: '987ooo987', id: 2 },
    ])
  })

  it('should sort array by string field DESC', () => {
    const next = jest.fn()
    defaultCtx.query.sortBy = 'title'
    defaultCtx.query.sortOrder = 'desc'

    sort(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '987ooo987', id: 2 },
      { title: '123ooo123', id: 1 },
      { title: '12345', id: 10 },
    ])
  })

  it('should sort array by number field ASC', () => {
    const next = jest.fn()
    defaultCtx.query.sortBy = 'id'
    defaultCtx.query.sortOrder = 'asc'

    sort(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '123ooo123', id: 1 },
      { title: '987ooo987', id: 2 },
      { title: '12345', id: 10 },
    ])
  })

  it('should sort array by number field DESC', () => {
    const next = jest.fn()
    defaultCtx.query.sortBy = 'id'
    defaultCtx.query.sortOrder = 'desc'

    sort(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '12345', id: 10 },
      { title: '987ooo987', id: 2 },
      { title: '123ooo123', id: 1 },
    ])
  })

  it('should not fail if field is not presented', () => {
    const next = jest.fn()
    defaultCtx.query.sortBy = 'description'
    defaultCtx.query.sortOrder = 'asc'

    sort(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual([
      { title: '987ooo987', id: 2 },
      { title: '12345', id: 10 },
      { title: '123ooo123', id: 1 },
    ])
  })
})

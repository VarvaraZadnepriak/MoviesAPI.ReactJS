const { updateContext } = require('../index')
const Movies = require('../../data/films.json')

describe('Utilites :: updateContext', function () {
  let defaultCtx = {
    state: {},
  }

  it('should return function', () => {
    expect(updateContext).toBeInstanceOf(Function)
  })

  it('should call next function', () => {
    const next = jest.fn()

    updateContext(defaultCtx, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should set correct state', () => {
    const next = jest.fn()

    updateContext(defaultCtx, next)

    expect(defaultCtx.state.Movies).toEqual(Movies)
  })
})

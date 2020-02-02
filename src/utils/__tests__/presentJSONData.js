const { presentJSONData } = require('../presenters')

describe('Utilites :: presentJSONData', function () {
  let defaultData = {}

  beforeEach(() => {
    defaultData = {
      fields: [{ a: 1 }],
      a: '1',
      b: 2,
    }
  })

  it('should return function', () => {
    expect(presentJSONData).toBeInstanceOf(Function)
  })

  it('should present items correctly', () => {
    const data = presentJSONData(defaultData)

    expect(data).toEqual(JSON.stringify(defaultData, null, 2))
  })
})

const { restoreMovieStructure } = require('../presenters')

describe('Utilites :: restoreMovieStructure', function () {
  let defaultData = {}

  beforeEach(() => {
    defaultData = {
      backdrop_path: '/ffff.jpg',
      poster_path: '/gggg.jpg',
      belongs_to_collection: {
        field: '1',
        backdrop_path: '/ffff.jpg',
        poster_path: '/gggg.jpg',
      },
      genres: [
        { name: '1' },
        { name: '2' },
      ],
    }
  })

  it('should return function', () => {
    expect(restoreMovieStructure).toBeInstanceOf(Function)
  })

  it('should present items correctly', () => {
    const data = restoreMovieStructure(defaultData)

    expect(data).toEqual({
      backdrop_path: 'https://image.tmdb.org/t/p/w500/ffff.jpg',
      poster_path: 'https://image.tmdb.org/t/p/w500/gggg.jpg',
      belongs_to_collection: {
        field: '1',
        backdrop_path: 'https://image.tmdb.org/t/p/w500/ffff.jpg',
        poster_path: 'https://image.tmdb.org/t/p/w500/gggg.jpg',
      },
      genres: ['1', '2'],
    })
  })
})

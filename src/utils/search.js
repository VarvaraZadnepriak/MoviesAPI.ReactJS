const searchMovies = (movies, query) => {
  let data = [...movies]
  const { search, searchBy } = query

  if (search && searchBy) {
    switch (searchBy) {
      case 'title':
        data = movies.filter(
          (item) => (new RegExp(search, 'i')).test(item.title),
        )
        break

      case 'genres': {
        const query = `${search[0].toUpperCase()}${search.substr(1)}`
        data = movies.filter(
          (item) => item.genres.some(x => x.includes(query)),
        )
        break
      }
    }
  }

  return data
}

const filterMovies = (movies, query) => {
  let data = [...movies]
  const { filter } = query

  const parsedGenres = filter && filter.split(',')

  if (parsedGenres && parsedGenres.length) {
    const filterLength = parsedGenres.length
    const filterMap = parsedGenres.reduce(
      (prev, curr) => Object.assign(prev, { [curr.toLowerCase().trim()]: true }),
      {},
    )

    data = movies.filter(item => {
      const array = item.genres || []

      const count = array.reduce(
        (prev, curr) => prev + (filterMap[curr.toLowerCase().trim()] ? 1 : 0),
        0,
      )

      return count >= filterLength
    })
  }

  return data
}

const sortMovies = (movies, query) => {
  const data = [...movies]
  const { sortBy, sortOrder } = query

  if (sortBy && sortOrder) {
    data.sort((a, b) => {
      let aField = a[sortBy]
      let bField = b[sortBy]

      if (sortOrder === 'desc') {
        const tmp = aField
        aField = bField
        bField = tmp
      }

      if (typeof aField === 'string') {
        return aField.localeCompare(bField)
      }

      if (typeof aField === 'number') {
        return aField - bField
      }

      return 0
    })
  }

  return data
}

const paginateMovies = (movies, query) => {
  const { offset, limit } = query

  const totalAmount = movies.length
  const data = movies.slice(offset, offset + limit)

  return {
    totalAmount,
    data,
  }
}

module.exports = {
  searchMovies,
  filterMovies,
  sortMovies,
  paginateMovies,
}

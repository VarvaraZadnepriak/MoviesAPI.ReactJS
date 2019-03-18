const filter = (ctx, next) => {
  const { filter } = ctx.query

  const parsedGenres = filter && filter.split(',')

  if (parsedGenres && parsedGenres.length) {
    const filterLength = parsedGenres.length
    const filterMap = parsedGenres.reduce(
      (prev, curr) => Object.assign(prev, { [curr.toLowerCase()]: true }),
      {}
    )

    ctx.state.Movies = ctx.state.Movies.filter(item => {
      const array = item.genres || []

      let count = array.reduce(
        (prev, curr) => prev + (filterMap[curr.toLowerCase()] ? 1 : 0),
        0
      )

      return count >= filterLength
    })
  }

  next()
}

module.exports = filter

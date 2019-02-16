
const search = (ctx, next) => {
  const { search, searchBy } = ctx.query

  if (search && searchBy) {
    switch (searchBy) {
      case 'title':
        ctx.state.Movies = ctx.state.Movies.filter(
          (item) => (new RegExp(search, 'i')).test(item.title)
        )
        break

      case 'genres':
        const query = `${search[0].toUpperCase()}${search.substr(1)}`
        ctx.state.Movies = ctx.state.Movies.filter(
          (item) => item.genres.some(x => x.includes(query))
        )
        break
    }
  }

  next()
}

module.exports = search

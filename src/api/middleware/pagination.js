
const pagination = (ctx, next) => {
  const { offset, limit } = ctx.query

  ctx.state.totalAmount = ctx.state.Movies.length
  ctx.state.Movies = ctx.state.Movies.slice(offset, offset + limit)

  next()
}

module.exports = pagination

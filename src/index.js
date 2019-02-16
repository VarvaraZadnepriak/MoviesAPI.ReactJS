const port = process.env.PORT || 4000
const src = './app'

const app = require(src)
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

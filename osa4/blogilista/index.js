const app = require('./app')
const http = require('http')
require('dotenv').config()

const server = http.createServer(app)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const routes = require('./src/routes')
const sockets = require('./src/sockets')

app.use(cors('*'))

app.get('/', (req, res) => {
  console.log('Welcome Home')
  res.send('OK')
})

app.use(express.json())
app.use(routes)

// Websocket
io.on('connection', socket => {
  console.log('Connected - ', socket.id)
  sockets(io, socket)
})

http.listen(3000, () => {
  console.log('Listening to port 3000...')
})

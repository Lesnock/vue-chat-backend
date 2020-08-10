const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  console.log('Welcome Home')
  res.send('OK')
})

const messages = []

// Websocket
io.on('connection', socket => {
  console.log('Connected ID:', socket.id)

  socket.on('send-message', (message) => {
    console.log(message)
    messages.push(message)
  })
})

http.listen(3000, () => {
  console.log('Listening to port 3000...')
})

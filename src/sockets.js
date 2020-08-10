const User = require('./models/User')
const Message = require('./models/Message')

const messages = []

module.exports = function (io, socket) {
  // Get User
  socket.on('get-user-by-username', async username => {
    const user = User.getByUsername(username)

    if (!user) {
      socket.emit('get-user-by-username-res', 'User not found')
    }

    socket.emit('get-user-by-username-res', user)
  })

  socket.on('send-message', async message => {
    Message.insert(message)
  })
}

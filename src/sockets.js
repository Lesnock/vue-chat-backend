const User = require('./models/User')
const Message = require('./models/Message')
const {
  isOnline,
  addConnection,
  removeConnection,
  getSocketIdByUserId,
  getConnections,
} = require('./connections')

module.exports = function (io, socket) {
  // Indentify user
  socket.on('user-id', userId => {
    addConnection(socket.id, userId)
  })

  // Get User
  socket.on('get-user-by-username', async username => {
    const user = User.getByUsername(username)

    if (!user) {
      socket.emit('get-user-by-username-res', 'User not found')
    }

    socket.emit('get-user-by-username-res', user)
  })

  socket.on('send-message', async message => {
    await Message.insert(message)

    if (isOnline(message.recipient_id)) {
      const receiverSocketId = getSocketIdByUserId(message.recipient_id)

      io.to(receiverSocketId).emit('receive-message', message)
    }
  })

  socket.on('disconnect', () => {
    removeConnection(socket.id)
  })

  socket.on('logout', () => {
    removeConnection(socket.id)
  })
}

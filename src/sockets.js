const User = require('./models/User')
const Message = require('./models/Message')

const {
  isOnline,
  addConnection,
  removeConnection,
  getSocketsByUserId,
} = require('./connections')

module.exports = function (io, socket) {
  // Indentify user
  socket.on('user-id', userId => {
    addConnection(socket.id, userId)

    Message.markAllMessagesAsReceived(userId)
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
    if (isOnline(message.recipient_id)) {
      // It's in plural because a user can be logged in more then one platform
      const receiverSockets = getSocketsByUserId(message.recipient_id)

      // If user is online, he will receive the message for sure
      message.received = true

      receiverSockets.forEach(socketId => {
        io.to(socketId).emit('receive-message', message)
      })

      // Mark this message as received in db
      Message.markMessageAsReceived(message.uuid)
    }

    await Message.insert(message)
  })

  socket.on('disconnect', () => {
    removeConnection(socket.id)
  })

  socket.on('logout', () => {
    removeConnection(socket.id)
  })
}

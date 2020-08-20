const User = require('./models/User')
const Message = require('./models/Message')

const {
  isOnline,
  addConnection,
  removeConnection,
  getSocketsByUserId,
  getConnection,
  getConnections,
} = require('./connections')

module.exports = function (io, socket) {

  // Indentify user
  socket.on('user-id', async userId => {
    addConnection(socket.id, userId)

    Message.markAllMessagesAsReceived(userId)

    // Notify others users
    for (const socketId in getConnections()) {
      if (socketId === socket.id) {
        continue;
      }

      io.to(socketId).emit('new-user-online', userId)
    }
  })

  socket.on('get-online-users', () => {
    socket.emit('online-users', getConnections())
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

      socket.emit('message-delivered', message.uuid)
    }

    await Message.insert(message)
  })

  socket.on('user-viewed-messages', sender_id => {
    const sockets = getSocketsByUserId(sender_id)
    const recipient_id = getConnection(socket.id)

    sockets.forEach(socketId => {
      io.to(socketId).emit('user-viewed-messages', recipient_id)
    })
  })

  socket.on('typing', ({ from, to }) => {
    if (isOnline(to)) {
      const sockets = getSocketsByUserId(to)

      sockets.map(socketId => {
        io.to(socketId).emit('contact-is-typing', from)
      })
    }
  })

  socket.on('stopped-typing', ({ from, to }) => {
    if (isOnline(to)) {
      const sockets = getSocketsByUserId(to)

      sockets.map(socketId => {
        io.to(socketId).emit('contact-stopped-typing', from)
      })
    }
  })

  socket.on('disconnect', () => {
    const userId = getConnection(socket.id)
    removeConnection(socket.id)

    // Notify others users
    for (const socketId in getConnections()) {
      io.to(socketId).emit('user-disconnected', userId)
    }
  })

  socket.on('logout', () => {
    const userId = getConnection(socket.id)
    removeConnection(socket.id)

    // Notify others users
    for (const socketId in getConnections()) {
      io.to(socketId).emit('user-disconnected', userId)
    }
  })
}

const connections = {}

module.exports = {
  getConnections() {
    return connections
  },

  getConnection(socketId) {
    return connections[socketId]
  },

  getSocketsByUserId(userId) {
    const sockets = []

    for (const socketId in connections) {
      if (connections[socketId] === userId) {
        sockets.push(socketId)
      }
    }

    return sockets
  },

  addConnection(socketId, userId) {
    connections[socketId] = userId
  },

  removeConnection(socketId) {
    delete connections[socketId]
  },

  isOnline(userId) {
    const sockets = Object.keys(connections)

    const connection = sockets.filter(socketId => connections[socketId] === userId)

    return connection.length > 0
  }
}

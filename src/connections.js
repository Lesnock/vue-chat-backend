const connections = {}

module.exports = {
  getConnections() {
    return connections
  },

  getConnection(socketId) {
    return connections[socketId]
  },

  getSocketIdByUserId(userId) {
    for (const socketId in connections) {
      if (connections[socketId] === userId) {
        return socketId
      }
    }

    return undefined
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

const db = require('../database')

class Message {
  static insert(message) {
    return db('messages').insert(message)
  }
}

module.exports = Message

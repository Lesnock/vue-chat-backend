const db = require('../database')

class Message {
  static insert(message) {
    return db('messages').insert(message)
  }

  static async markMessageAsReceived(messageUuid) {
    await db('messages')
      .where('uuid', messageUuid)
      .update({ received: true })
  }

  static async markAllMessagesAsReceived(userId) {
    await db('messages')
      .where('uuid', userId)
      .where('received', false)
      .update({ received: true })
  }
}

module.exports = Message
